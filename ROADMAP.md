# 🗺️ ROADMAP — Midnight Gardens

> Documento vivo de planificación del desarrollo de Midnight Gardens.  
> Última actualización: Marzo 2026 | Versión actual: 0.9.2

---

## 📌 FASE 1 — Pulir lo existente (v1.0)

### 1.1 Completar sistemas a medio implementar
- [x] **Ascensión de héroes** — UI completa con pantalla de confirmación, animación, y display de bonus permanentes.
- [x] **Sistema de elementos visual** — Feedback en combate: ventaja/desventaja elemental. Indicadores de multiplicador elemental en daño.
- [x] **Combo real en Engine** — Multiplicadores progresivos por clicks rápidos consecutivos.

### 1.2 Calidad de vida (QoL)
- [ ] Bulk-actions mejoradas (vender por rareza, auto-equip inteligente por DPS).
- [ ] Tooltips en TODOS los ítems/héroes al hacer long-press (móvil).
- [ ] Indicador de progreso offline desglosado (monedas, XP, stages avanzados).
- [ ] Confirmaciones para acciones costosas (summon ×10, prestige).
- [ ] Tutorial interactivo para nuevos jugadores (paso a paso con highlights).

### 1.3 Balance y progresión
- [ ] Curva de dificultad revisada para stages 100-500.
- [ ] Rebalancear costos de summon vs. recompensas.
- [ ] Impacto real de mascotas en combate (no solo bonos pasivos).

---

## 🚀 FASE 2 — Contenido mid-game (v1.1)

### 2.1 Sistema de Crafting
- [x] Combinar ítems duplicados para mejorar rareza (3 Common → 1 Rare).
- [x] Materiales de desmantelamiento de ítems vendidos.
- [x] Recetas desbloqueables por stage/colección.
- [x] Ítems con prefijos aleatorios ("Blazing Iron Sword", "Frozen Eclipse Scythe").

### 2.2 Misiones y Desafíos diarios
- [x] 3 misiones diarias (ej: "Derrota 50 enemigos", "Gasta 1000 monedas").
- [x] Recompensas en gemas/esencia.
- [x] Misiones semanales más difíciles con mejores premios.
- [x] Racha de misiones completas (streak bonus).

### 2.3 Exploración / Expediciones
- [x] Enviar héroes NO activos a expediciones con temporizador (1h, 4h, 8h).
- [x] Recompensas aleatorias: ítems, monedas, materiales de craft.
- [x] Bonus por enviar héroes con el elemento correcto.
- [x] Mapa visual con regiones desbloqueables por stage.

### 2.4 Más contenido
- [x] 8-12 héroes nuevos (completar 24 totales, 6 por rareza).
- [x] 10+ ítems nuevos con efectos especiales (lifesteal, DoT, splash).
- [x] 10 nuevos pisos de torre (floor 13-22).
- [ ] 20+ logros adicionales.
- [ ] 4 mascotas nuevas con mecánicas únicas.

---

## ⭐ FASE 3 — Endgame y profundidad (v1.2)

### 3.1 Sistema de Runas / Encantamientos
- [ ] Obtener runas como drops raros del Tower.
- [ ] Insertar runas en ítems para bonus pasivos (crit%, DPS%, coin bonus).
- [ ] 5 tipos de runas con 3 tiers cada una.
- [ ] Límite de runas por ítem según rareza.

### 3.2 Modo Desafío / Dungeons
- [ ] Dungeon semanal con pisos infinitos y modificadores (2× HP, timer 60s, etc.).
- [ ] Leaderboard local (mejor piso alcanzado).
- [ ] Recompensas exclusivas: skins de héroes, ítems únicos.

### 3.3 Prestige 2.0 — Sistema de Maestría
- [ ] Tras X prestiges, desbloquear "Maestrías" por héroe.
- [ ] Cada héroe: skill tree simple (3 ramas, 5 nodos).
- [ ] Las maestrías persisten entre prestiges.

### 3.4 Boss Raids
- [ ] Boss especial mensual con HP pool masivo.
- [ ] Fases con mecánicas especiales (curación, enrage, etc.).
- [ ] Recompensas por participación + bonus por daño total.

### 3.5 Reliquias (artifacts permanentes)
- [ ] Obtener reliquias al completar colecciones.
- [ ] Bonus globales permanentes que escalan con prestige count.
- [ ] 10 reliquias con efectos únicos.

---

## 🌐 FASE 4 — Social y meta (v1.5)

### 4.1 Gremios / Clanes
- [ ] Crear/unirse a un gremio (max 20 miembros).
- [ ] Boss de gremio cooperativo.
- [ ] Chat de gremio simple.
- [ ] Bonos pasivos por nivel de gremio.

### 4.2 Leaderboards
- [ ] Global: stage máximo, DPS total, kills totales, tower floor.
- [ ] Semanal con reset cada lunes.
- [ ] Por gremio: ranking interno.
- [ ] Perfil público con estadísticas.

### 4.3 Battle Pass (Seasonal)
- [ ] Track gratuito con 30 niveles de recompensas.
- [ ] XP por jugar normalmente.
- [ ] Rotación mensual con temas (Fire Season, Ice Season, etc.).

### 4.4 Cosméticos
- [ ] Skins de héroes (visuales alternativos, sin stats).
- [ ] Marcos de perfil y títulos personalizados.
- [ ] Temas de UI (dark, neon, nature, etc.).
- [ ] Emotes/reacciones para gremio.

---

## 🔬 FASE 5 — Tech y expansión (v2.0)

### 5.1 PWA + Notificaciones
- [ ] Convertir a Progressive Web App (installable).
- [ ] Push notifications: expediciones, daily login, eventos.
- [ ] Sincronización cloud save (Firebase/Supabase).

### 5.2 Internacionalización (i18n)
- [ ] Soporte multi-idioma (ES, EN, PT).
- [ ] Textos extraídos a archivos de traducción.

### 5.3 Sonido y música
- [ ] Soundtrack ambient (2-3 tracks).
- [ ] SFX para clicks, kills, level ups, summons.
- [ ] Volumen configurable en settings.

### 5.4 Analytics y balanceo
- [ ] Telemetría anónima: puntos de atasco, compras.
- [ ] A/B testing de curvas de dificultad.
- [ ] Dashboard de retención.

---

## 💡 IDEAS BONUS

| # | Idea | Impacto | Esfuerzo | Estado |
|---|------|---------|----------|--------|
| B1 | Fusión de héroes (2 iguales → ascensión) | Alto | Medio | Pendiente |
| B2 | Modo AFK mejorado (ganancias offline) | Alto | Bajo | Ya existe offline |
| B3 | Enemigos de élite aleatorios (1% chance, ×3 recompensa) | Medio | Bajo | ✅ Hecho |
| B4 | Logbook/diario de aventura narrativo | Medio | Medio | Pendiente |
| B5 | Puzzle minigame nuevo (match-3 temático) | Medio | Alto | Pendiente |
| B6 | Time-limited banners de summon (tasa UP) | Alto | Medio | Pendiente |
| B7 | Achievements secretos / Easter eggs | Bajo | Bajo | ✅ Hecho |
| B8 | Modo nocturno automático (hora real) | Bajo | Bajo | Pendiente |
| B9 | Sistema de trading entre saves | Alto | Alto | Pendiente |
| B10 | Boss rush mode (10 bosses seguidos, timer) | Alto | Medio | ✅ Hecho |

---

## 📊 Estado del contenido actual

| Tipo | Cantidad actual | Objetivo v1.0 | Objetivo v2.0 |
|------|----------------|---------------|---------------|
| Héroes | 23 | 12 | 24+ |
| Enemigos | 25+ | 25+ | 40+ |
| Ítems | 27 | 20 | 40+ |
| Upgrades (Academia) | 15 | 15 | 20 |
| Prestige Lines | 8 | 8 | 12 |
| Tower Floors | 22 | 12 | 22 |
| Colecciones | 6 | 6 | 10 |
| Eventos | 7 | 7 | 14 |
| Logros | 78 | 70+ | 100+ |
| Mascotas | 4 | 4 | 8 |
| Mini-Juegos | 3 | 3 | 5 |
| Misiones diarias | 3+2 semanales | 3 | 5 |
| Runas | 0 | 0 | 15 |
| Reliquias | 0 | 0 | 10 |

---

*Midnight Gardens © 2024-2026 Sistemas Ursol*
