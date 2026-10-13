DONARBUSTIN AI — paquete inicial

Contenido:
- index.html: página principal basada en tu web y chat con interfaz conversacional.
- api/chat.js: servidor Vercel que conecta el chat con OpenAI de forma segura.
- vercel.json: configuración básica de Vercel.

IMPORTANTE:
El HTML por sí solo no puede dar respuestas inteligentes reales. GitHub Pages solo sirve archivos estáticos, así que /api/chat no funcionará allí sin un backend separado.

Para activar la IA:
1. Despliega este proyecto en Vercel.
2. En Vercel > Project Settings > Environment Variables, crea OPENAI_API_KEY con tu clave secreta de API.
3. Redeploy el proyecto.
4. La API puede tener costes según el uso y la tarifa vigente. No compartas tu clave ni la pongas en el HTML o en un repositorio público.
5. La página hace referencia a avatar_donarbustin.png y Mi_camino_Donarbustin_libro_completo.pdf; copia esos archivos al mismo proyecto si quieres que sigan apareciendo.

No incluye la clave de API. Revisa la configuración y los límites de gasto de la cuenta antes de activarla.
