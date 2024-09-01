# Instellen Raspberry Pi voor R.A.D.I.O.

1. Koop een Raspberry Pi (en sluit hem aan, je kan dit!)
2. Installeer Raspbian
3. `sudo apt-get update`
4. `sudo apt-get dist-upgrade` (duurt lang)
5. `sudo apt-get install iceweasel`
6. Zet het volgende in `/usr/share/xsessions/custom.desktop`:

   ```
   [Desktop Entry]
   Name=Xsession
   Exec=/etc/X11/Xsession
   ```

7. Pas de volgende regel aan in `/etc/lightdm/lightdm.conf`:

   ```
   autologin-session=custom
   ```

8. Maak een `~/.xsession` bestand aan en zet er iets van het volgende in:

   ```
   # Eventuele setup voordat je het volgende doet. Geen windowmanager betekent
   # exec voor het programma zetten (X verwacht een fork() call)
   exec firefox
   # Of:
   # exec firefox -url "radio.svsticky.nl" -fullscreen
   ```

9. SSH keys naar keuze
10. Pre-assigned IP adres configureren in de router.
