# Upute za lokalno pokretanje aplikacije

Budući da nismo stigli obaviti deployment aplikacije, potrebno je podesiti lokalno okruženje kako bi se pokrenula.

### Namještanje lokalne baze podataka

1. Potrebno je stvoriti PostgreSQL bazu podataka.
2. Podesiti src/main/resources/application.properties tako da odgovaraju stvorenoj bazi (url, username i password). Već je zadana postava za naše lokalne testove, pa bi trebalo biti lagano za podesiti po potrebi.

### Namještanje CLIENT_ID i CLIENT_SECRET za Google OAuth 2.0

Potrebno je dodati "secrets" mapu u src/main/resources/ kako bi poslužitelj mogao iščitati podatke za pristup Google OAuth konzoli. Kako su ovi podatci API ključevi, nije ih sigurno javno objavljivati na GitHub-u, pa se, molim Vas, javite na ib55199@fer.hr (ili hr54899@fer.hr) kako bi Vam poslali direktorij u .zip formatu.

### Pokretanje servera

Server se, među ostalim, može pokrenuti tako da se prezume .zip cijele grane, pa se HoodClassics-backend importa kao Maven projekt u IntelliJ/Gradle. Nakon toga se program može samo pokrenuti i server će započeti.

### VAŽNO ZA ISPRAVLJAČE (naknadna promjene)
Profesor Sruk nam je javio 19.11. da bismo naš funkcionalni kod trebali premjestiti na main branch. Naš kod je do sada bio na dev branchu jer je na mainu bio naš kod koji smo pokušali deployat. Iako nismo uspjeli napraviti deployment na tom bivšem main branchu se je moglo vidjeti da smo aktivno radili na deploymentu (vide se docker fileovi itd.). Stoga smo odlučili samo zamijeniti saržaje main i dev brancha. Kod u trenutnom main branchu predstavlja našu trenutnu funkcionalnost aplikacije, a u dev branchu se mogu vidjeti naši pokušaji da deployamo taj kod. Također sam primjetio da smo slučajno u static folderu napravili još jedan static folder, pa sam taj dodatni static folder obrisao (ujedno kako bi ispravljači mogli bez poteškoća pokretati kod). Zato piše na githubu da je "promijenjen" backend, ali nije bilo nikakvih promjena u kodu ili wiki-u nakon isteka roka za predaju.
