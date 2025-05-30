#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 创建临时英文路径
TEMP_DIR=$(mktemp -d)
cp -r dist/* "$TEMP_DIR"

# 进入临时文件夹
cd "$TEMP_DIR"

git init
git config --global core.quotepath false  # 解决中文路径问题
git add -A
git commit -m 'deploy'

# 推送到GitHub Pages
git push -f git@github.com:zzf-gitch/wzry.git master:gh-pages

# 清理临时文件夹
cd -
rm -rf "$TEMP_DIR"
