# wallextest
On RHEL, CentOS
1. Install Node.js
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
2. Install git and clone the repo
sudo yum install git
git clone https://github.com/sudahang/wallextest.git
3. Run test
cd wallextest
npm i
npm test
