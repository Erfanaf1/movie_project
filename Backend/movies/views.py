from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Movie, Genre, UserToken
from .serializers import MovieSerializer, GenreSerializer
from .services import MovieAPIService


# ========== فیلم‌ها (محلی) ==========

class MovieListCreateView(generics.ListCreateAPIView):
    """لیست فیلم‌های ذخیره شده در دیتابیس محلی"""
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    """جزئیات، ویرایش و حذف فیلم محلی"""
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


# ========== ژانرها (محلی) ==========

class GenreListView(generics.ListAPIView):
    """لیست ژانرهای ذخیره شده در دیتابیس محلی"""
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


# ========== ارتباط با API خارجی ==========

@api_view(['GET'])
def external_movies_list(request):
    """دریافت لیست فیلم‌ها از API خارجی"""
    page = request.GET.get('page', 1)
    result = MovieAPIService.get_movies(page)
    
    if result:
        return Response(result)
    return Response({'error': 'خطا در دریافت اطلاعات'}, status=500)


@api_view(['GET'])
def external_movie_detail(request, movie_id):
    """دریافت جزئیات فیلم از API خارجی"""
    result = MovieAPIService.get_movie_detail(movie_id)
    
    if result:
        return Response(result)
    return Response({'error': 'فیلم یافت نشد'}, status=404)


@api_view(['GET'])
def external_search_movies(request):
    """جستجوی فیلم در API خارجی"""
    query = request.GET.get('q', '')
    page = request.GET.get('page', 1)
    
    if not query:
        return Response({'error': 'لطفاً نام فیلم را وارد کنید'}, status=400)
    
    result = MovieAPIService.search_movies(query, page)
    
    if result:
        return Response(result)
    return Response({'error': 'خطا در جستجو'}, status=500)


@api_view(['GET'])
def external_genres_list(request):
    """دریافت لیست ژانرها از API خارجی"""
    result = MovieAPIService.get_genres()
    
    if result:
        return Response(result)
    return Response({'error': 'خطا در دریافت ژانرها'}, status=500)


@api_view(['GET'])
def external_genre_movies(request, genre_id):
    """دریافت فیلم‌های یک ژانر از API خارجی"""
    page = request.GET.get('page', 1)
    result = MovieAPIService.get_genre_movies(genre_id, page)
    
    if result:
        return Response(result)
    return Response({'error': 'خطا در دریافت فیلم‌ها'}, status=500)


@api_view(['POST'])
def external_register(request):
    """ثبت نام در API خارجی"""
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not all([name, email, password]):
        return Response({'error': 'نام، ایمیل و پسورد الزامی است'}, status=400)
    
    result = MovieAPIService.register_user(name, email, password)
    
    if result and 'id' in result:
        return Response(result, status=201)
    return Response(result or {'error': 'خطا در ثبت نام'}, status=500)


@api_view(['POST'])
def external_login(request):
    """لاگین در API خارجی و ذخیره توکن محلی"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not all([username, password]):
        return Response({'error': 'نام کاربری و پسورد الزامی است'}, status=400)
    
    result = MovieAPIService.login_user(username, password)
    
    if result and 'access_token' in result:
        # دریافت اطلاعات کاربر و ذخیره در دیتابیس محلی
        user_info = MovieAPIService.get_user_info(result['access_token'])
        
        if user_info and 'id' in user_info:
            UserToken.objects.update_or_create(
                user_id=user_info['id'],
                defaults={
                    'name': user_info.get('name', ''),
                    'email': user_info.get('email', ''),
                    'access_token': result['access_token'],
                    'refresh_token': result.get('refresh_token', ''),
                    'expires_in': result.get('expires_in', 0),
                }
            )
        
        return Response({
            'message': 'لاگین موفق',
            'user': user_info,
            'tokens': result
        })
    
    return Response(result or {'error': 'خطا در لاگین'}, status=401)


@api_view(['POST'])
def external_sync_movie(request):
    """همگام‌سازی یک فیلم از API خارجی به دیتابیس محلی"""
    movie_id = request.data.get('movie_id')
    
    if not movie_id:
        return Response({'error': 'movie_id الزامی است'}, status=400)
    
    movie, created = MovieAPIService.sync_movie_to_db(movie_id)
    
    if movie:
        serializer = MovieSerializer(movie)
        return Response({
            'message': 'فیلم با موفقیت همگام‌سازی شد',
            'created': created,
            'movie': serializer.data
        })
    
    return Response({'error': 'فیلم یافت نشد'}, status=404)


@api_view(['POST'])
def external_sync_genres(request):
    """همگام‌سازی همه ژانرها از API خارجی به دیتابیس محلی"""
    genres, count = MovieAPIService.sync_all_genres()
    
    serializer = GenreSerializer(genres, many=True)
    return Response({
        'message': f'{count} ژانر با موفقیت همگام‌سازی شد',
        'genres': serializer.data
    })