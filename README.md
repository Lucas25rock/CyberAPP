# CyberAPP — CyberKYD Music Gallery

Galería de música interactiva para el proyecto musical **CyberKYD**.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (animaciones)
- **Supabase** (Auth + DB para comentarios)
- **Spotify Embed API / SoundCloud Widget API**

## Secciones

- **Hero** — Portada con el nombre del artista
- **Artista** — Biografía + redes sociales
- **Discografía** — Grid de álbumes con reproductor embebido (Spotify / SoundCloud)
- **Comentarios** — Login con GitHub/Google, CRUD de comentarios en tiempo real

## Requisitos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) (para la sección de comentarios)

## Setup

```bash
npm install
```

Configurar variables de entorno en `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### Tabla de Supabase necesaria

```sql
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```
