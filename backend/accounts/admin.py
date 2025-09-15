from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account

class AccountAdmin(UserAdmin):
    list_display = ('pk', 'username', 'email_address', 'is_staff', 'is_active', 'is_admin', 'is_superuser', 'date_joined', 'last_login')
    readonly_fields= ('date_joined', 'last_login')
    ordering= ('-date_joined',)
    list_filter = ()
    filter_horizontal = ()
    search_fields = ('username', 'email_address')


    fieldsets = (
        (None, {'fields': ('email_address', 'username','password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions','is_admin')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email_address', 'username','password1', 'password2', 'is_active', 'is_staff', 'is_admin')}
        ),
    )

admin.site.register(Account, AccountAdmin)
