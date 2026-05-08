from django.urls import path
from . import views

urlpatterns = [
    # ===== دیتابیس محلی =====
    path('api/movies/', views.MovieListCreateView.as_view(), name='movie-list'),
    path('api/movies/<int:pk>/', views.MovieDetailView.as_view(), name='movie-detail'),
    path('api/genres/', views.GenreListView.as_view(), name='genre-list'),
    
    # ===== فیلم‌ها از API خارجی =====
    path('api/external/movies/', views.external_movies_list, name='external-movies'),
    path('api/external/movies/<int:movie_id>/', views.external_movie_detail, name='external-movie-detail'),
    path('api/external/search/', views.external_search_movies, name='external-search'),
    
    # ===== ژانرها از API خارجی =====
    path('api/external/genres/', views.external_genres_list, name='external-genres'),
    path('api/external/genres/<int:genre_id>/movies/', views.external_genre_movies, name='external-genre-movies'),
    
    # ===== احراز هویت =====
    path('api/auth/register/', views.external_register, name='register'),
    path('api/auth/login/', views.external_login, name='login'),
    
    # ===== همگام‌سازی =====
    path('api/sync/movie/', views.external_sync_movie, name='sync-movie'),
    path('api/sync/genres/', views.external_sync_genres, name='sync-genres'),
]