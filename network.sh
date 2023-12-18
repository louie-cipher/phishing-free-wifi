#check if has root permission
if [ "$(id -u)" -ne 0 ]; then
	echo "Please run as root"
	exit 1
fi

dnsmasqOff() {
	systemctl disable dnsmasq
	systemctl stop dnsmasq
	echo "redirect off"
}

dnsmasqOn() {
	systemctl enable dnsmasq
	systemctl start dnsmasq
	echo "redirect on"
}

hostapdOff() {
	systemctl disable hostapd
	systemctl stop hostapd
	echo "wifi off"
}

hostapdOn() {
	systemctl enable hostapd
	systemctl start hostapd
	echo "wifi on"
}

passwdOff() {
	sed -i 's/wpa=2/wpa=0/' /etc/hostapd/hostapd.conf
	echo "password off"
}

passwdOn() {
	sed -i 's/wpa=0/wpa=2/' /etc/hostapd/hostapd.conf
	echo "password on"
}

# dnsmasq
if [ "$1" = "dns-off" ]; then
	dnsmasqOff
elif [ "$1" = "dns-on" ]; then
	dnsmasqOn
elif [ "$1" = "dns" ]; then
	if systemctl is-active --quiet dnsmasq; then
		dnsmasqOff
	else
		dnsmasqOn
	fi

# hostapd
elif [ "$1" = "wifi-off" ]; then
	hostapdOff
elif [ "$1" = "wifi-on" ]; then
	hostapdOn
elif [ "$1" = "wifi" ]; then
	if systemctl is-active --quiet hostapd; then
		hostapdOff
	else
		hostapdOn
	fi

# hostapd ssid
elif [ "$1" = "ssid" ]; then
	if [ -z "$2" ]; then
		echo "Please enter ssid"
		exit 1
	fi
	sed -i "s/^ssid=.*/ssid=$new_ssid/" /etc/hostapd/hostapd.conf

# hostapd password
elif [ "$1" = "passwd-off"]; then
	if ["$(
		grep -q 'wpa=2' /etc/hostapd/hostapd.conf
		echo $?
	)" -eq 0 ]; then
		echo "password already off"
		exit 1
	fi
	passwdOff
elif [ "$1" = "passwd-on" ]; then
	if ["$(
		grep -q 'wpa=0' /etc/hostapd/hostapd.conf
		echo $?
	)" -eq 0 ]; then
		echo "password already on"
		exit 1
	fi
	passwdOn
elif [ "$1" = "passwd" ]; then #toggle hostapd password
	if grep -q "wpa=2" /etc/hostapd/hostapd.conf; then
		passwdOff
	else
		passwdOn
	fi
fi
