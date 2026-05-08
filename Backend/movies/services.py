import requests
from .models import Movie, Genre, UserToken

class MovieAPIService:
    """سرویس کامل ارتباط با moviesapi.ir"""
    
    BASE_URL = "http://moviesapi.ir/api/v1"
    OAUTH_URL = "http://moviesapi.ir/oauth/token"
    
    # ========== فیلم‌ها ==========
    
    @staticmethod
    def get_movies(page=1):
        """دریافت لیست فیلم‌ها"""
        url = f"{MovieAPIService.BASE_URL}/movies"
        response = requests.get(url, params={'page': page})
        return response.json() if response.ok else None
    
    @staticmethod
    def get_movie_detail(movie_id):
        """دریافت اطلاعات کامل یک فیلم"""
        url = f"{MovieAPIService.BASE_URL}/movies/{movie_id}"
        response = requests.get(url)
        return response.json() if response.ok else None
    
    @staticmethod
    def search_movies(query, page=1):
        """جستجوی فیلم بر اساس نام"""
        url = f"{MovieAPIService.BASE_URL}/movies"
        response = requests.get(url, params={'q': query, 'page': page})
        return response.json() if response.ok else None
    
    @staticmethod
    def create_movie(data, token):
        """
        ثبت فیلم جدید (نیاز به توکن)
        data باید شامل: title, imdb_id, country, year, director, imdb_rating, imdb_votes, poster
        """
        url = f"{MovieAPIService.BASE_URL}/movies"
        headers = {'Authorization': f'Bearer {token}'}
        
        response = requests.post(url, json=data, headers=headers)
        return response.json() if response.ok else {'error': response.text}
    
    # ========== ژانرها ==========
    
    @staticmethod
    def get_genres():
        """دریافت لیست همه ژانرها"""
        url = f"{MovieAPIService.BASE_URL}/genres"
        response = requests.get(url)
        return response.json() if response.ok else None
    
    @staticmethod
    def get_genre_movies(genre_id, page=1):
        """دریافت فیلم‌های یک ژانر خاص"""
        url = f"{MovieAPIService.BASE_URL}/genres/{genre_id}/movies"
        response = requests.get(url, params={'page': page})
        return response.json() if response.ok else None
    
    # ========== احراز هویت ==========
    
    @staticmethod
    def register_user(name, email, password):
        """ثبت نام کاربر جدید"""
        url = f"{MovieAPIService.BASE_URL}/register"
        data = {'name': name, 'email': email, 'password': password}
        response = requests.post(url, json=data)
        return response.json() if response.ok else None
    
    @staticmethod
    def login_user(username, password):
        """لاگین و دریافت توکن"""
        data = {
            'grant_type': 'password',
            'username': username,
            'password': password
        }
        response = requests.post(MovieAPIService.OAUTH_URL, data=data)
        return response.json() if response.ok else None
    
    @staticmethod
    def refresh_token(refresh_token):
        """دریافت توکن جدید با refresh_token"""
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }
        response = requests.post(MovieAPIService.OAUTH_URL, data=data)
        return response.json() if response.ok else None
    
    @staticmethod
    def get_user_info(token):
        """گرفتن اطلاعات کاربر (نیاز به توکن)"""
        url = f"{MovieAPIService.BASE_URL}/user"
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.post(url, headers=headers)
        return response.json() if response.ok else None
    
    # ========== همگام‌سازی با دیتابیس محلی ==========
    
    @staticmethod
    def sync_movie_to_db(movie_id):
        """همگام‌سازی یک فیلم از API به دیتابیس محلی"""
        movie_data = MovieAPIService.get_movie_detail(movie_id)
        
        if not movie_data:
            return None, False
        
        # تبدیل لیست ژانرها به رشته
        genres_str = ', '.join(movie_data.get('genres', []))
        
        movie, created = Movie.objects.update_or_create(
            api_id=movie_data.get('id'),
            defaults={
                'title': movie_data.get('title', ''),
                'poster': movie_data.get('poster', ''),
                'year': movie_data.get('year', ''),
                'rated': movie_data.get('rated', ''),
                'released': movie_data.get('released', ''),
                'runtime': movie_data.get('runtime', ''),
                'director': movie_data.get('director', ''),
                'writer': movie_data.get('writer', ''),
                'actors': movie_data.get('actors', ''),
                'plot': movie_data.get('plot', ''),
                'country': movie_data.get('country', ''),
                'awards': movie_data.get('awards', ''),
                'metascore': movie_data.get('metascore', ''),
                'imdb_rating': movie_data.get('imdb_rating', ''),
                'imdb_votes': movie_data.get('imdb_votes', ''),
                'imdb_id': movie_data.get('imdb_id', ''),
                'movie_type': movie_data.get('type', ''),
                'genres': genres_str,
            }
        )
        return movie, created
    
    @staticmethod
    def sync_all_genres():
        """همگام‌سازی همه ژانرها با دیتابیس محلی"""
        genres_data = MovieAPIService.get_genres()
        
        if not genres_data:
            return [], 0
        
        synced = []
        for genre_data in genres_data:
            genre, created = Genre.objects.update_or_create(
                api_id=genre_data['id'],
                defaults={'name': genre_data['name']}
            )
            synced.append(genre)
        
        return synced, len(synced)