from django import forms 
from.models import Friend

class HelloForm(forms.Form):
    name = forms.CharField(label='name', \
            widget=forms.TextInput(attrs={"class":"form-control"}))
    mail = forms.CharField(label='mail', \
            widget=forms.TextInput(attrs={"class":"form-control"}))
    age = forms.IntegerField(label='age', \
            widget=forms.NumberInput(attrs={"class":"form-control"}))

class Sessionform(forms.Form):
    session = forms.CharField(label="session", \
            widget=forms.TextInput(attrs={"class":"form-control"}))
    
class FriendForm(forms.ModelForm):
    class Meta:
        model = Friend
        fields = ['name','mail','gender','age','birthdy']
