from django.contrib import admin
from .models import CustomUser

admin.site.register(CustomUser)
# class StudentExtraAdmin(admin.ModelAdmin):
#     pass
# admin.site.register(StudentExtra, StudentExtraAdmin)

# class TeacherExtraAdmin(admin.ModelAdmin):
#     pass
# admin.site.register(TeacherExtra, TeacherExtraAdmin)

# class AttendanceAdmin(admin.ModelAdmin):
#     pass
# admin.site.register(Attendance, AttendanceAdmin)

# class NoticeAdmin(admin.ModelAdmin):
#     pass
# admin.site.register(Notice, NoticeAdmin)
