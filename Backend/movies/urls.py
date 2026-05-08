from django.urls import path
from . import views

urlpatterns = [
    # === دیتابیس محلی ===
    path('movies/', views.MovieListCreateView.as_view(), name='movie-list'),
    path('movies/<int:pk>/', views.MovieDetailView.as_view(), name='movie-detail'),
    path('genres/', views.GenreListView.as_view(), name='genre-list'),
    
    # === API خارجی فیلم‌ها ===
    path('external/movies/', views.external_movies_list, name='external-movies'),
    path('external/movies/<int:movie_id>/', views.external_movie_detail, name='external-movie-detail'),
    path('external/search/', views.external_search_movies, name='external-search'),
    
    # === API خارجی ژانرها ===
    path('external/genres/', views.external_genres_list, name='external-genres'),
    path('external/genres/<int:genre_id>/movies/', views.external_genre_movies, name='external-genre-movies'),
]