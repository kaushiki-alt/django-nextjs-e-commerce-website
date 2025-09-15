from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class AccountManager(BaseUserManager):
    def create_user(self, email_address, username, password=None, **extra_fields):
        if not email_address:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")
        
        email_address = self.normalize_email(email_address)
        user = self.model(
            email_address=email_address,
            username=username,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email_address, username, password=None, **extra_fields):
            extra_fields.setdefault("is_staff", True)
            extra_fields.setdefault("is_superuser", True)
            extra_fields.setdefault("is_admin", True)
            extra_fields.setdefault("is_active", True)

            return self.create_user(email_address, username, password, **extra_fields)

class Account(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True, blank=False)
    email_address = models.EmailField(max_length=100, blank=False, unique=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login= models.DateTimeField(auto_now=True)

      # Required for Django admin & permissions
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email_address'
    REQUIRED_FIELDS = ['username', 'first_name']

    objects = AccountManager()


    def __str__(self):
        return self.email_address