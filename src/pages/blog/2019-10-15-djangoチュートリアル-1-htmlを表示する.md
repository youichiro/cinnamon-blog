---
templateKey: blog-post
title: Djangoチュートリアル(1) HTMLを表示する
date: 2019-10-15T09:32:00.135Z
description: >-
  python言語のWebアプリケーションフレームワークである"Django"を使ったWebアプリの作り方を，章を分けて紹介して行きます．今回はDjangoのインストールからHTMLページを表示するまで行います．
tags:
  - python
  - django
---
## Djangoとは
![django1-1](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-1.jpeg)
DjangoはPython製のWebアプリケーションフレームワークです．
Webアプリケーション作成に必要な様々な機能が揃っているため「フルスタックフレームワーク」と呼ばれます．RubyでのRuby on Railsのような立ち位置になります．

## RailsじゃなくてDjango？
WebアプリケーションフレームワークはDjangoよりもRailsの方が一般的で，多くの企業で採用されていますが，個人的にはDjangoの方が好きです．その理由となるDjangoの特徴を挙げてみます．

### ユーザ承認機能，管理画面が標準搭載されている
Railsで管理画面を作成するときはActiveAdminなどのgemを使用するかと思います．Djangoではプロジェクトを作成した時にユーザ承認機能，管理画面が自動で作成されます．もちろん，ユーザモデルのカスタマイズ，管理画面の編集もできます．管理画面のことを考えることが少なくなり，アプリケーションの中身の実装に集中できるため非常に便利です．

↓Djangoの管理画面
![django1-2](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-2.png)

### コードがわかりやすい
Railsは開発における規則を固める(レールを敷く)ことで，コード量が少なくなり簡単に開発ができる一方，裏に潜む見えないルールによってファイル間の対応関係などが把握しづらいです．一方Djangoは規則が少なく割と自由に実装ができ，処理の流れを追いやすくなりますが，コード量は多くなります．Railsでは原因がよくわからないエラーに遭遇しますが，Djangoではそれが少ない印象です．開発したいプロジェクトの規模によってフレームワークを使い分けるといいと思います．
![django1-3](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-3.png)

pythonで機械学習を勉強していれば，Djangoとの親和性が高いです．Railsと比べるとDjangoは日本語の解説が少ないため難しい印象がありますが，公式ドキュメントがわかりやすいのは良い点です．


## Djangoをインストールする
pythonがインストールされていることを確認します．

```bash
$ python -V
Python 3.6.6  # 3.5以上にしましょう
```

Djangoのインストール

```bash
$ pip install django
```

Djangoがインストールされたかを確認します．

```bash
$ python
>>> import django
>>> print(django.get_version())
2.0.2
```


## プロジェクトを作成する
次のコマンドでプロジェクトを作成します．mysiteはプロジェクト名になります．

```bash
$ django-admin startproject mysite
```

プロジェクトディレクトリに以下のファイルが生成されます．

```
mysite/
  - manage.py
  - mysite/
    - __init__.py
    - settings.py
    - urls.py
    - wsgi.py
```

プロジェクトディレクトリに移動し，サーバーを起動してブラウザで表示してみましょう．

```bash
$ cd mysite
$ python manage.py runserver
```

`localhost:8000`を開いて以下の画面が表示されることを確認します．

![django1-4](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-4.png)


## アプリケーションを作成する
Djangoではプロジェクトの下にアプリケーションという機能のパッケージを配置していきます．

![django1-5](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-5.png)

次のコマンドでmemo_appというアプリケーションを作成します．

```bash
$ python manage.py startapp memo_app
```

以下のファイルが生成されます．

```
mysite/
  - manage.py
  - mysite/
  - memo_app/
    - __init__.py
    - admin.py
    - apps.py
    - migrations/
      - __init__.py
    - models.py
    - tests.py
    - views.py
```

プロジェクトの設定ファイルである`mysite/settings.py`に`memo_app`アプリケーションを追記します．アプリケーションを作成したら必ずこれをしてください．

```python
# mysite/settings.py

...

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'memo_app',  # ここ
]

...
```

## Hello Worldを表示する
まずはブラウザに”Hello World”を表示するだけの実装をしてみましょう．
流れ:

- テンプレートと呼ばれるHTMLファイルを作成する
- ビューにテンプレートを呼び出す関数を定義する
- ビューを表示するためのURLを定義する

`memo_app`ディレクトリに`templates`ディレクトリを作成します．

```bash
$ mkdir memo_app/templates
```

その下に`index.html`を作成し，Hello Worldを表示するためのHTMLを書きます．

```html
<!-- memo_app/templates/index.html -->
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>memo_app</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

`memo_app/views.py`を編集します．

```python
# memo_app/views.py
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')  # 先ほど作成したhtmlを第2引数に指定する
```

`memo_app/urls.py`を作成し，URLを定義します．

```python
# memo_app/urls.py
from django.urls import path
from . import views

app_name = 'memo_app'
urlpatterns = [
    path('index/', views.index, name='index'),
]
```

path関数の第1引数でurlを指定し，第2引数でそのurlに対応するビューを指定します．

プロジェクト全体のURLの設定ファイルである`mysite/urls.py`に`memo_app/urls.py`を追加します．

```python
# mysite/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('memo_app/', include('memo_app.urls')),
]
```

サーバーを起動し，`localhost:8000/memo_app/index`を開いてみましょう．

```bash
$ python manage.py runserver
```

![django1-6](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-6.png)



## HTMLに変数を渡す
`memo_app/views.py`を以下のように変更してみましょう．

```python
# memo_app/views.py
from django.shortcuts import render

def index(request):
    return render(request, 'index.html', {'text': 'This page is memo_app/index.html'})
```

render関数の第3引数に指定した辞書をテンプレートに渡すことができます．
テンプレートでは`{{ text }}`のようにカギ括弧×2で渡された変数を囲むことでその値を表示することができます．

```html
<!-- memo_app/templates/index.html -->

...

<body>
  <h1>Hello World</h1>
  <p>{{ text }}</p>
</body>
</html>
```

![django1-7](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-7.png)


ここまでで，ユーザ側から見た処理の流れはこのようになります．

![django1-8](https://cinnamon-blog.s3.eu-west-2.amazonaws.com/django1/django1-8.png)

urlを入力したら，それに対応するアプリケーション，ビューが割り当てられ，ビューがテンプレートを呼び出して画面表示します．ちなみに実装の順序はこれと逆でしたね．



---
今回は自分の作成したHTMLファイルをDjangoで表示して見ました．また，任意の変数の値をテンプレートに当てはめて表示しました．
今のディレクトリの状態はこのようになっています．

```
mysite/
    - manage.py
    - memo_app/
        - __init__.py
        - admin.py
        - apps.py
        - migrations/
            - __init__.py
        - models.py
        - templates/
            - index.html
        - tests.py
        - urls.py
        - views.py
    - mysite/
        - __init__.py
        - settings.py
        - urls.py
        - wsgi.py
```
