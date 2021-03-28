# Kawalkada
Projekt zrobiony w trakcie 5-tej edycji hackathonu Hacknarök 

![gif](gif.gif)

## Inspiration
W obliczu coraz mocniejszych restrkcji, codzienne zakupy mogą zamienić się w festiwal czekania przed drzwiami

![:(](https://bi.im-g.pl/im/68/a4/18/z25837928Q,W-zwiazku-z-pandemia-koronawirusa-od-1-kwietnia-og.jpg
)

## What it does
**Kawalkada** *(dawniej grupa pojazdów lub jeźdźców jadących gdzieś razem)* to system do zarządzania kolejką w sklepach lub innych placówkach. Klient może zapisać się do kolejki  w zaciszu swojego domu, a gdy w sklepie zwolni się miejsce otrzyma kod QR umożliwiający mu wejście do środka.
Ochroniarz stający przed drzwiami i pilnujący liczby osób wewnątrz został zastąpiony czytnikiem kodów (Raspberry Pi Zero z podpiętą kamerką internetową która wpuszcza kolejne osoby). Ponadto system oblicza średni czas stania w kolejce tak, aby użytkownik wiedział kiedy może się spodziewać wejścia do sklepu. 

## How we built it
Front-end został napisany w HTML5. Kod po stronie serwera został napisany od zera w Pythonie.
Czytnik kodów QR (Raspberry Pi Zero z podpiętą kamerką internetową) czyta kody oraz komunikuje się z serwerem przy pomocy bibliotek Pythonowych.
