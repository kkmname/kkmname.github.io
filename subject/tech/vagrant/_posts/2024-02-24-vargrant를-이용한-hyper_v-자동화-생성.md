---
title: "vagrant를 이용한 hyper-v 자동화 생성"
layout: page
---

> https://developer.hashicorp.com/vagrant/docs/providers/hyperv
> 
> Hyper-V must be enabled prior to using the provider. Most Windows installations will not have Hyper-V enabled by default. Hyper-V is available by default for almost all Windows Enterprise, Professional, or Education 8.1 and later installs. To enable Hyper-V, go to "Programs and Features", click on "Turn Windows features on or off" and check the box next to "Hyper-V". Or install via PowerShell with:
> 
> `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`

# 【1】Vagrant 설치
https://developer.hashicorp.com/vagrant/install?product_intent=vagrant#windows

# 【2】Vagrantfile 생성

```PowerShell
$ cd /dev/vagrant/RockyLinux9.3
$ vi Vargrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "generic/rocky9"
  config.vm.network "public_network", bridge: "10.0.1.1", ip: "10.0.1.11"
  config.ssh.insert_key = false
  config.vm.provider :hyperv do |hv, override|
    hv.auto_start_action
    hv.memory = 8192
	hv.maxmemory = nil
	hv.vmname = "RockyLinux-9.3"
    hv.cpus = 2
    override.vm.hostname = "rocky-linux"
  end
  config.vm.provision "shell", inline: <<-SHELL
	sudo -i
	useradd -m admin
	echo "infra1122!" | sudo passwd --stdin admin
  SHELL
end
```

# 【3】Vagrant 실행

```PowerShell
$ cd /dev/vagrant/RockyLinux9.3
$ vagrant up --provider=hyperv
$ vargrant ssh
```