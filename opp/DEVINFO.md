# Osnovne informacije ostatku tima - pročitati "BITNO" na kraju

### Implementirane rute i funkcionalnosti
Za sad su implementirane tri rute: GET / - ne treba autentifikaciju, tu se samo nalazi placeholder stranica
								   GET /users/list - treba autentifikaciju, tu se ispiše lista korisnika zabilježenih
								                 u BP
								   POST /users/add - treba autentifikaciju, u tijelu POST zahtjeva se navede
								   					 JSON za objekt koji odgovara "User" objektu, npr.
								   					 {
								   					 	"name":"Marko",
								   					 	"surname":"Marulić",
								   					 	"email":"marko.marulic@split.com",
								   					 	"username":"markoboss123"
								   					 }
								   					 takav se korisnik onda dodaje u bazu podataka
Kada neautentificirani korisnik pokuša pristupiti jednoj od nedozvoljenih ruta (trenutno išta osim "/"), 
automatski je redirektiran na Google login, a nakon uspješne se autorizacije vraća nazad na / (homepage).
Ako korisnik sada (nakon autentifikacije) proba otići na npr. /users/list, moći će pristupiti sadržaju.

Redirektiranje na naš vlastiti login page koji ima "sign in with Google" gumb, vlastita autorizacija i sl. još nisu
implementirani i zahtijevaju suradnju frontend i backend tima (dakle deployment), ali se to može izvesti ovaj vikend.
Neke od njih će uskoro implementirati moj kolega.

### Baza podataka

Za sada osnovna, sadrži samo "Users" tablicu. Za detalje pogledati opp/src/main/java/hoodlcassics/opp/domain/Users.java.
Bazu podataka generira Spring pri pokretanju aplikacije. Na trenutnim se postavkama baza podataka birše nakon gašenja
servera.

### Informacije za pokretanje

Budući da je sve hostano lokalno, za pokretanje ovog backenda potrebno je prvo namjestiti par stvari.
	1. Lokalno stvoriti bazu podataka i podesiti src/main/resources/application.properties tako da odgovara
	   stvorenoj bazi. Ovo je lakše nego izgleda, samo zamijenite URL, username i password sa vašim, što se sve
	   namjesti u PgAdmin-u.
	2. Folder "secrets", koji ću vam poslati preko discorda, treba pozicionirati u src/main/resources/ tako da je
	   puni put do .txt filea iz kojeg aplikacije vuče šifru opp/src/main/resources/secrets/google.txt.
	3. Sve što je na GitHubu na ovom branchu samo skinite, stavite u jedan direktorij i importajte kao Maven project
	   u Eclipse/IntelliJ. Onda kliknite Run (nije bitno iz koje klase, snać će se) i to je to, server je gore.
	  
### TODO-ovi i daljnji planovi

U svrhu da što ranije bude gotovo jer smo u vremenskoj stisci, negdje su neke stvari nezgrapno i nesigurno izvedeno.
Specifično: 
	POST zahtjevi nisu mogli procesirani osim ako nisam samo isključio neke sigurnosne mehanizme,
	server trenutno nema izvedene informativne poruke za eventualne pogreške/neispravne zahtjeve
	i čitanje Google OAuth client secreta iz .txt datoteke (kako je trenutno implementirano) ja jako nesigurno.
	
Ovo su problemi koji će se morati doraditi, ali ne ugrožavaju osnovne funkcionalnosti aplikacije.

# !!!!!!!!!!!! BITNO !!!!!!!!!!!!
Ako ćete pullati/pushati, molim vas da secrets folder navedete u .gitignore zato da ne bi slučajno završio na GitHub-u.
Hvala!

### Vjerojatno će biti problema sa spajanjem sa frontendom ili funkcionalnostima koje fale, pa planiram biti dostupan
### većinu vremena.
	
	
								   		