# 🚀 Guía de Configuración Manual para Google AdSense e Inspección de Sitio

Esta guía detalla los pasos exactos que debes realizar manualmente para activar **Google AdSense** en tu plataforma web de teoría musical y pasar la revisión e inspección oficial de Google sin rechazos.

---

## 📋 Checklist Pre-Aprobación para Pasar la Inspección de Google AdSense

Para asegurar el 100% de probabilidad de ser aprobado por el equipo de revisión de Google AdSense, asegúrate de cumplir con los siguientes puntos:

1. **Contenido Único y De Valor (Cumplido):**
   - Tu sitio cuenta con un manual extenso de teoría musical, armonización de grados, fórmulas exactas y un explorador interactivo de mástil de guitarra de 6 a 9 cuerdas.
2. **Navegación Clara e Intuitiva (Cumplido):**
   - El menú superior y el pie de página conectan la **Enciclopedia**, el **Mástil Interactivo** y las páginas legales.
3. **Páginas Legales Obligatorias (Cumplidas e Incluidas):**
   - `politica-de-privacidad.html`
   - `terminos-y-condiciones.html`
   - `contacto.html`

---

## 🛠️ Reemplazos Manuales Necesarios en los Archivos HTML

En los archivos `index.html`, `politica-de-privacidad.html`, `terminos-y-condiciones.html` y `contacto.html` existen marcadores de posición que debes actualizar con tus datos reales de Google AdSense y dominio.

### 1. Reemplazar el ID de Cliente de Google AdSense (`ca-pub-XXXXXXXXXXXXXXXX`)

Abre `index.html` y busca en el `<head>` la etiqueta del script de AdSense:

```html
<!-- Reemplaza ca-pub-XXXXXXXXXXXXXXXX con tu ID real de Publisher de AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

*(Obtén tu `ca-pub-XXXXXXXXXXXXXXXX` directamente desde el panel principal de tu cuenta de Google AdSense).*

---

### 2. Configurar o Reemplazar los Bloques de Anuncios (`data-ad-slot`)

En `index.html` se han colocado 3 contenedores publicitarios optimizados para no interferir con la experiencia del usuario (cumpliendo las políticas de *User Experience* de Google):

- **Banner Superior:**
  ```html
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-1234567890123456"
       data-ad-slot="TU_NUMERO_DE_SLOT_1"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  ```

- **Banner Intermedio (Entre la Enciclopedia y la Herramienta):**
  ```html
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-1234567890123456"
       data-ad-slot="TU_NUMERO_DE_SLOT_2"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  ```

- **Banner Inferior (Footer):**
  ```html
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-1234567890123456"
       data-ad-slot="TU_NUMERO_DE_SLOT_3"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  ```

> **Nota:** Si prefieres utilizar **Anuncios Automáticos (Auto Ads)** de AdSense, solo necesitas mantener la etiqueta `<script>` en el `<head>` con tu `ca-pub-XXXXXXXXXXXXXXXX` y Google colocará los anuncios de forma inteligente.

---

### 3. Actualizar la Información de Contacto Real

Abre `contacto.html` y `politica-de-privacidad.html` y edita la dirección de correo electrónico de soporte:

```html
<!-- Cambiar contacto@tudominio.com por tu correo real de administración del sitio -->
<p><strong>Correo Electrónico de Contacto:</strong> soporte@tu-dominio-real.com</p>
```

---

## 📌 Pasos Finales para la Solicitud en Google AdSense

1. Sube todos los archivos (`index.html`, `styles.css`, `app.js`, `politica-de-privacidad.html`, `terminos-y-condiciones.html`, `contacto.html`, `GUIA_ESCALAS_Y_MODOS.md`) a tu servidor o hosting web con un **Dominio Propio** (ej. `www.tuescalademusica.com`).
2. Entra a tu consola de [Google AdSense](https://adsense.google.com/).
3. Haz clic en **Sitios** $\rightarrow$ **Añadir sitio**.
4. Ingresa el nombre de tu dominio.
5. Haz clic en **Solicitar revisión**.

Normalmente la inspección tarda entre 24 horas y 14 días. ¡Tu sitio cumple con todos los requisitos de contenido extenso, originalidad y páginas de políticas!
