from rest_framework import serializers
from .models import Movie, Genre, UserToken


class MovieSerializer(serializers.ModelSerializer):
    """سریالایزر برای مدل فیلم"""
    
    # فیلد اضافی برای نمایش (اگه خواستی)
    is_watched = serializers.SerializerMethodField()
    
    class Meta:
        model = Movie
        fields = [
            'id', 'api_id', 'title', 'poster', 'year', 'director',
            'country', 'imdb_rating', 'imdb_id', 'genres',
            'status', 'user_rating', 'user_note', 'created_at',
            'is_watched'
        ]
        read_only_fields = ['id', 'created_at', 'api_id']
    
    def get_is_watched(self, obj):
        """چک کردن اینکه فیلم دیده شده یا نه"""
        return obj.status == 'watched'


class GenreSerializer(serializers.ModelSerializer):
    """سریالایزر برای مدل ژانر"""
    
    class Meta:
        model = Genre
        fields = ['id', 'api_id', 'name']
        read_only_fields = ['id']


class UserTokenSerializer(serializers.ModelSerializer):
    """سریالایزر برای مدل توکن کاربر"""
    
    class Meta:
        model = UserToken
        fields = ['id', 'user_id', 'name', 'email', 'created_at']
        read_only_fields = ['id', 'created_at']