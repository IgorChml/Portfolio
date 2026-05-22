TUTAJ DODAJ SWOJE PLIKI WIDEO:
-----------------------------

Aby Twoje lokalne pliki wideo wyświetlały się poprawnie w kartach portfolio, musisz umieścić je w tym folderze:
`/public/videos/`

Upewnij się, że nazwy plików odpowiadają dokładnie nazwom zadeklarowanym w pliku `/src/data.ts`:
1. Dla projektu Kocibaits -> `/public/videos/kocibaits.mp4`
2. Dla CML Klimatyzacje -> `/public/videos/cml-klimatyzacje.mp4`
3. Dla Artwall Design -> `/public/videos/artwall-design.mp4`
4. Dla Igor Chmiel Portfolio -> `/public/videos/igor-chmiel.mp4`

Dlaczego wideo się wcześniej nie odtwarzało?
1. Brakowało katalogu `public/videos/` w strukturze projektu. W systemach opartych na Vite, pliki statyczne muszą znajdować się w głównym katalogu `public/`, aby były serwowane pod adresem zawierającym samą ścieżkę (np. `/videos/...`).
2. Alternatywne wideo zapasowe (fallbackVideo) z Pixabay blokowało tzw. "hotlinking" (serwowanie bezpośrednio na innych stronach internetowych), zwracając błąd 403 (Zabronione), przez co czarny ekran pojawiał się również przy braku plików lokalnych.

Zaktualizowaliśmy również pliki zapasowe (fallbackVideo) w `/src/data.ts` na w pełni publiczne i odblokowane strumienie wideo, dzięki czemu działają one od razu podczas podglądu, zanim jeszcze wgrasz swoje własne pliki!
