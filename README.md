# wallextest
On RHEL, CentOS
1. Install Node.js
  1.1curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
  1.2sudo yum -y install nodejs
2. Install git and clone the repo
  2.1sudo yum install git
  2.2git clone https://github.com/sudahang/wallextest.git
3. Run test
  3.1cd wallextest
  3.2npm i
  3.3npm test
