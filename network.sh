#check if has root permission
if [ "$(id -u)" -ne 0 ]; then
    echo "Please run as root"
    exit 1
fi

if [ "$1" = "dns-off" ]; then
    systemctl stop dnsmasq
    echo "redirect off"
elif [ "$1" = "dns-on" ]; then
    systemctl start dnsmasq
    echo "redirect on"
elif [ "$1" = "dns" ]; then
    #toggle redirect
    if grep -q "address=/#/192.168.4.1" /etc/dnsmasq.conf; then
        sed -i 's/address/#address/g' /etc/dnsmasq.conf
        systemctl restart dnsmasq
        echo "redirect off"
    else
        sed -i 's/#address/address/g' /etc/dnsmasq.conf
        systemctl restart dnsmasq
        echo "redirect on"
    fi
elif [ "$1" = "wifi-off" ]; then
    #turn off hostapd
    systemctl stop hostapd
    echo "wifi off"
elif [ "$1" = "wifi-on" ]; then
    #turn on hostapd
    systemctl start hostapd
    echo "wifi on"
elif [ "$1" = "wifi" ]; then
    #toggle hostapd
    if systemctl is-active --quiet hostapd; then
        systemctl stop hostapd
        echo "wifi off"
    else
        systemctl start hostapd
        echo "wifi on"
    fi
fi
