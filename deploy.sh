# rm -r build
mv dist build
ssh asdma@192.168.11.157 rm -r /app/node/web/NCRP/build
scp -r build asdma@192.168.11.157:/app/node/web/NCRP/
