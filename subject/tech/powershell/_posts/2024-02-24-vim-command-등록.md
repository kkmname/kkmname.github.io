---
title: "vim command 등록"
layout: page
---

# 【1】Vim 설치

```PowerShell
$ winget install vim.vim
```

# 【2】Vim 설치위치 확인

```PowerShell
$ cd '.\Program Files\'
$ Get-ChildItem -Recurse -Filter "vim.exe"

    Directory: C:\Program Files\Vim\vim91

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---        2024-02-13  오전 8:09        4806144 vim.exe

```

# 【3】Profile에 등록

```PowerShell
$ C:\"Program Files"\Vim\vim91\vim.exe $PROFILE
...
$env:Path += ";C:\Program Files\Vim\vim91"
```

# 【4】테스트

```PowerShell
$ vim
```