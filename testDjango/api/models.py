from django.db import models
from django.contrib.auth.models import User

#message2クラス
class Message2(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message2_owner')
    owner_name = models.TextField(max_length=1000)
    content = models.TextField(max_length=1000)
    good_count = models.IntegerField(default=0)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.content) + ' (' + str(self.owner) + ')'
    
    class Meta:
        #新しい順番にオーダーする
        ordering = ('-pub_date',)
    

#good2クラス
class Good2(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='good2_owner')
    message = models.ForeignKey(Message2, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '"' + str(self.message2) + '" (by )' + str(self.owner) + ')'
    
    class Meta:
        #新しい順番にオーダーする
        ordering = ('-pub_date',)
