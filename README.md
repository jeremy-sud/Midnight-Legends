# 🌙 Midnight Gardens

> *Un RPG incremental/idle ambientado en un jardín maldito donde la luna nunca se pone y las estrellas susurran secretos olvidados.*

[![Versión](https://img.shields.io/badge/versión-0.9.2-blueviolet)]()
[![Stack](https://img.shields.io/badge/stack-Vite%20+%20Vanilla%20JS-brightgreen)]()
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue)]()

---

## 📖 Tabla de contenidos

- [El Lore](#-el-lore)
- [Cómo jugar](#-cómo-jugar)
- [Sistemas del juego](#-sistemas-del-juego)
- [Héroes](#-héroes)
- [Elementos](#-elementos)
- [Enemigos y Combate](#-enemigos-y-combate)
- [La Torre Eclipse](#-la-torre-eclipse)
- [Expediciones](#-expediciones)
- [Boss Rush](#-boss-rush)
- [Mascotas](#-mascotas)
- [Ítems y Prefijos](#-ítems-y-prefijos)
- [Misiones](#-misiones)
- [Prestige — Renacimiento del Vacío](#-prestige--renacimiento-del-vacío)
- [Mini-juegos](#-mini-juegos)
- [Desarrollo](#-desarrollo)
- [Roadmap](#-roadmap)

---

## 🌑 El Lore

### El Despertar

Existe un lugar entre los mundos, un jardín suspendido en el crepúsculo eterno donde la luna brilla con una luz que no es la suya. Los antiguos lo llamaban **Midnight Gardens** — el último bastión contra la corrupción del Vacío.

Tú eres un **Arquitecto**, un ser elegido por la luna agonizante para convocar héroes de todas las eras y defender lo que queda de la luz. Las monedas que recoges no son metal — son **luz de luna cristalizada**, fragmentos de la energía vital del jardín. El Stardust, ese polvo estelar que brilla entre tus dedos, es **materia de creación pura**, lo que queda de las estrellas que cayeron protegiéndolo.

### Los Fragmentos de la Corona

Hace eones, el **Rey Luna** gobernó Midnight Gardens con una corona de siete fragmentos estelares. Cada fragmento contenía el poder de sellar al Vacío. Pero la corrupción fue paciente. Susurró. Prometió. Y el Rey, agotado por una guerra interminable, selló su propio poder en los pisos de la **Torre Eclipse** para que nadie — ni él mismo — pudiera ser tentado.

Ahora la torre se alza como un monumento a su sacrificio. Cada piso que conquistas libera un eco de su poder. Pero con cada fragmento recuperado, la prisión del Vacío se debilita.

### La Sombra del Drake

En el piso más profundo de la torre duerme el **Shadow Drake**, la primera criatura corrompida. Fue alguna vez el guardián del jardín, un dragón de luz pura. El Vacío lo retorció, lo convirtió en sombra viva. Derrotarlo no lo destruye — solo lo duerme. Cada ciclo, cada prestige, cada renacimiento... la sombra se agita de nuevo.

### Los Synthari

Tus familiares — esas criaturas luminosas que luchan a tu lado — son **Synthari**, fragmentos autónomos de defensa del jardín. Luna, el gatito lunar; Ember, el zorro de fuego; Bubbles, el espíritu acuático... no son simples mascotas. Son manifestaciones del propio jardín intentando sobrevivir, y crecen más fuertes cuanto más los cuidas.

### La Semilla del Vacío

Más allá del stage 1000, en las profundidades donde la luz de la luna ya no alcanza, late la **Semilla del Vacío** — la fuente de toda la corrupción y, paradójicamente, de toda la existencia. No es un enemigo que puedas matar. Es el origen mismo de la dualidad: luz y sombra, creación y destrucción.

El verdadero final de Midnight Gardens no es destruir el Vacío. Es entenderlo.

### Los Elementos

Las cinco fuerzas elementales son los pilares de Midnight Gardens:

| Elemento | Símbolo | Dominio |
|----------|---------|---------|
| 🔥 **Fuego** | Pasión y destrucción | El calor primordial que forjó el jardín |
| ❄️ **Hielo** | Preservación y quietud | La calma que congela la corrupción |
| 🌑 **Sombra** | Secretos y adaptación | El velo entre mundos |
| ✨ **Luz** | Pureza y restauración | La esencia de la luna |
| 🌀 **Vacío** | Infinito y transformación | El poder más allá de la comprensión |

Cada elemento domina a otro en un ciclo eterno:
**Fuego → Hielo → Sombra → Luz → Vacío → Fuego**

---

## 🕹️ Cómo jugar

### Inicio rápido

1. **Haz click** en los enemigos para derrotarlos y ganar monedas lunares
2. **Mejora** tu Academia para aumentar el daño pasivo
3. **Invoca héroes** con Stardust para formar tu equipo (máx. 4 activos)
4. **Equipa ítems** que encuentras como botín de combate
5. **Avanza stages** — cada 10 stages enfrentas un jefe con timer
6. **Sube la Torre Eclipse** para obtener Stardust masivo
7. **Haz Prestige** al llegar al stage 50+ para ganar Esencia permanente

### Recursos

| Recurso | Símbolo | Cómo se obtiene |
|---------|---------|-----------------|
| Monedas lunares | 🪙 | Derrotar enemigos, misiones |
| Stardust | ✨ | Torre Eclipse, drops, expediciones |
| Gemas | 💎 | Misiones, logros, drops raros |
| Esencia | 🌀 | Prestige (reinicio con bonus) |

---

## ⚙️ Sistemas del juego

Midnight Gardens combina mecánicas idle/incremental con RPG táctico:

- **Combate automático** — Tus héroes atacan constantemente; clicks amplifica el daño
- **Progresión por stages** — Enemigos cada vez más fuertes, jefes cada 10 niveles
- **Party de 4 héroes** — Elige combinaciones estratégicas de elementos
- **Equipamiento** — Armas, armaduras, accesorios con rareza y prefijos
- **Gacha / Invocación** — Gasta Stardust o monedas para reclutar héroes
- **Prestige** — Reinicia para ganar bonus permanentes exponenciales
- **Eventos diarios** — Bonus diferentes cada día de la semana
- **Crafting** — Combina ítems duplicados para forjarlos en rareza superior

---

## 🦸 Héroes

12 héroes disponibles en 4 niveles de rareza:

### ⚪ Comunes
| Héroe | Elemento | DPS Base | Rol |
|-------|----------|----------|-----|
| Moon Peasant | ✨ Luz | 1 | Luchador básico del jardín |
| Lunar Militia | 🔥 Fuego | 2 | Soldado de la guardia lunar |
| Dusk Scout | 🌑 Sombra | 3 | Explorador del crepúsculo |
| Garden Herbalist | ✨ Luz | 4 | Sanador de la flora corrupta |

### 🔵 Raros
| Héroe | Elemento | DPS Base | Rol |
|-------|----------|----------|-----|
| Night Ranger | 🌑 Sombra | 15 | Francotirador de las sombras |
| Spark Elementalist | 🔥 Fuego | 18 | Mago de fuego estelar |
| Starweaver Cleric | ✨ Luz | 20 | Tejedor de luz de estrellas |
| Chrono Mage | 🌀 Vacío | 25 | Manipulador del tiempo |

### 🟣 Épicos
| Héroe | Elemento | DPS Base | Rol |
|-------|----------|----------|-----|
| Paladin of Eclipse | ✨ Luz | 150 | Caballero del eclipse sagrado |
| Shadow Dancer | 🌑 Sombra | 180 | Asesina del velo nocturno |
| Twilight Necromancer | 🌀 Vacío | 200 | Nigromante del crepúsculo |
| Dragon Knight | 🔥 Fuego | 250 | Jinete del dragón lunar |

### 🟡 Legendarios
| Héroe | Elemento | DPS Base | Rol |
|-------|----------|----------|-----|
| The Moon King | ✨ Luz | 1000 | El Rey Luna en persona — fragmento restaurado |
| Void Empress | 🌀 Vacío | 1500 | Emperatriz del Vacío — poder más allá de la comprensión |

### Ascensión

Los héroes pueden **ascender** consumiendo Esencia, ganando bonus permanentes por nivel:
- +10% DPS base
- +10% generación de monedas
- +5% probabilidad de crítico

---

## 🔥 Elementos

El sistema elemental crea combate táctico con ventajas y desventajas:

```
🔥 Fuego  ──supera──▶  ❄️ Hielo
❄️ Hielo  ──supera──▶  🌑 Sombra
🌑 Sombra ──supera──▶  ✨ Luz
✨ Luz    ──supera──▶  🌀 Vacío
🌀 Vacío  ──supera──▶  🔥 Fuego
```

| Situación | Multiplicador |
|-----------|---------------|
| Elemento ventajoso | ×1.5 daño |
| Elemento desventajoso | ×0.7 daño |
| Neutral | ×1.0 daño |

**8 efectos de estado** en combate: Burn, Freeze, Poison, Bleed, Stun, Shield, Enrage, Regen.

---

## 👾 Enemigos y Combate

### Enemigos por tier

**Tier I — El Jardín Exterior:**
Lunar Slime, Shadow Rat, Neon Wisp, Cave Bat, Void Spider

**Tier II — Las Profundidades:**
Midnight Wolf, Pale Wraith, Sporecap, Fallen Knight, Crystal Elemental

**Tier III — El Corazón Corrupto:**
Dark Treant, Blood Phantom, Nightmare Jester, Star-forged Golem, Eclipse Hydra

### Enemigos de élite

Cualquier enemigo tiene un 1% de probabilidad de aparecer como **Élite** (borde dorado brillante), con:
- ×3 HP
- ×3 recompensas (monedas, XP, loot)
- Indicador visual especial

### Jefes

Cada 10 stages aparece un **jefe** con un timer de 30 segundos. Si no lo derrotas a tiempo, debes intentar de nuevo. Los jefes tienen significativamente más HP pero dan recompensas masivas.

---

## 🏰 La Torre Eclipse

La Torre Eclipse es donde el Rey Luna selló sus fragmentos de poder. 12 pisos de dificultad creciente:

| Piso | Jefe | HP | Recompensa (Stardust) |
|------|------|----|-----------------------|
| 1 | Corrupted Peasant | 5K | 50 |
| 2 | Shadow Drake | 25K | 150 |
| 3 | Eclipse Guardian | 100K | 500 |
| 6 | The Hollow King | 10M | 15K |
| 9 | Astral Behemoth | 7.5B | 2.5M |
| 12 | The Midnight Sovereign | 500B | 50M |

Cada piso tiene un timer de 30 segundos. Completar toda la torre reinicia el ciclo con escalado exponencial.

---

## 🗺️ Expediciones

Envía héroes que **no están en tu party activa** a misiones con temporizador:

| Duración | Recompensa base |
|----------|-----------------|
| 1 hora | Monedas + Stardust básico |
| 4 horas | Recompensas medias + chance de loot |
| 8 horas | Recompensas altas + loot garantizado |

**6 regiones** desbloqueables por stage:
- 🌿 Sunlit Grove (Stage 1+, afinidad Luz)
- 🔥 Ember Caves (Stage 25+, afinidad Fuego)
- ❄️ Frozen Lake (Stage 50+, afinidad Hielo)
- 🌑 Shadow Marsh (Stage 100+, afinidad Sombra)
- 🌀 Void Rift (Stage 200+, afinidad Vacío)
- ⭐ Astral Summit (Stage 500+, todas las afinidades)

**Bonus elemental:** Enviar un héroe cuyo elemento coincida con la región da **+30% recompensas**.

Máximo **3 expediciones simultáneas**.

---

## 🏴 Boss Rush

Modo de combate intenso: enfrenta **10 jefes consecutivos** con 60 segundos por jefe.

Cada jefe tiene ×1.4 HP del anterior. Cinco tiers de recompensa:

| Jefes derrotados | Recompensa |
|------------------|------------|
| 1 | 500 monedas + 10 Stardust |
| 3 | 2000 monedas + 3 gemas |
| 5 | 5000 monedas + 50 Stardust + 5 gemas |
| 7 | 15000 monedas + 10 gemas + 3 Esencia |
| 10 | 50000 monedas + 200 Stardust + 20 gemas + 10 Esencia |

**Cooldown:** 30 minutos entre intentos. Se guarda tu mejor oleada alcanzada.

---

## 🐾 Mascotas

Los Synthari son fragmentos vivos del jardín. Cuídalos para maximizar sus bonus:

| Synthari | Especie | Bonus por nivel |
|----------|---------|-----------------|
| 🐱 Luna | Moon Kitten | +2% monedas |
| 🦊 Ember | Fire Fox | +1.5% DPS |
| 💧 Bubbles | Water Sprite | +2.5% Stardust |
| 🐰 Mochi | Cloud Bunny | +2% XP |
| 🦇 Shadow | Void Bat | +3% Esencia, +0.5% Loot |
| 🌱 Sprout | Garden Sprite | +1% monedas y DPS |

Las mascotas tienen **hambre**, **felicidad** y **energía**. Su humor (0-100%) escala directamente el bonus que dan. ¡Aliméntalas y juega con ellas!

---

## ⚔️ Ítems y Prefijos

### Rareza

| Rareza | Multiplicador de stats | Color |
|--------|------------------------|-------|
| ⚪ Common | ×1 | Gris |
| 🔵 Rare | ×2 | Azul |
| 🟣 Epic | ×5 | Púrpura |
| 🟡 Legendary | ×15 | Dorado |

### Categorías

- **Armas** (5): Iron Sword, Steel Axe, Moonblade, Eclipse Scythe, Stellar Bow
- **Armaduras** (5): Leather Tunic, Chain Mail, Shadow Cloak, Lunar Plate, Voidweave Robe
- **Accesorios** (6): Copper Ring, Silver Amulet, Crystal Orb, Twilight Pendant, Void Charm, Crown Shard

### Sistema de prefijos

Los ítems Rare+ pueden obtener un **prefijo aleatorio** que añade un bonus extra:

| Prefijo | Bonus | Probabilidad |
|---------|-------|--------------|
| 🔥 Blazing | +10% DPS | Rare: 30%, Epic: 60%, Legendary: 100% |
| ❄️ Frozen | +12% DPS | — |
| 🌑 Shadow | +3 Crit chance | — |
| ✨ Blessed | +15% Coins | — |
| 🏛️ Ancient | +12% DPS | — |
| 🌀 Void | +4 Crit chance | — |
| ⭐ Stellar | +20% Coins | — |
| 💀 Cursed | +5 Crit chance | — |
| 🌟 Radiant | +8% DPS | — |
| 👻 Spectral | +18% Coins | — |

Ejemplo: *"Blazing Eclipse Scythe"* = Eclipse Scythe + 10% DPS bonus.

---

## 📋 Misiones

### Misiones diarias (3/día)

Generadas aleatoriamente cada día. Ejemplos:
- "Derrota 50 enemigos" → 500 monedas + 5 Stardust
- "Haz 100 clicks" → 300 monedas + 1 gema
- "Gana 5000 monedas" → 10 Stardust + 1 gema

### Misiones semanales (2/semana)

Objetivos más grandes con mejores recompensas:
- "Derrota 500 enemigos" → 8 gemas + 40 Stardust
- "Gana 50000 monedas" → 12 gemas + 50 Stardust

### Racha diaria (Streak)

Completa las 3 misiones diarias en días consecutivos para bonus acumulativo:

| Días consecutivos | Bonus |
|--------------------|-------|
| 2-4 días | +2 gemas |
| 5-6 días | +5 gemas |
| 7+ días | +10 gemas |

---

## 🌀 Prestige — Renacimiento del Vacío

Al llegar al **Stage 50+**, puedes hacer Prestige: reiniciar tu progreso a cambio de **Esencia**, un recurso permanente.

**Fórmula:** `Esencia = ⌊√(stage - 49)⌋ + ⌊(stage - 49) / 25⌋`

La Esencia compra **8 mejoras permanentes** que persisten entre reinicios:

| Mejora | Efecto por nivel | Niveles máx |
|--------|------------------|-------------|
| Void Strength | +20% DPS | 20 |
| Void Avarice | +25% Monedas | 20 |
| Void Insight | +30% XP | 15 |
| Void Radiance | +30% Stardust | 15 |
| Void Resonance | +2% Chance de gema | 10 |
| Void Impact | +30% Daño por click | 15 |
| Void Momentum | +5 Stage inicial | 10 |
| Void Companion | +25% Familiar | 15 |

---

## 🎮 Mini-juegos

Tres mini-juegos desbloqueables para variedad:

| Mini-juego | Mecánica | Recompensa máxima |
|------------|----------|-------------------|
| 🔮 Mystic Oracle | Adivina un número 1-20 | 5000 monedas + 5 gemas |
| 🃏 Shadow Match | Memoria: empareja 6 pares en 8 movimientos | 3000 monedas + 20 Stardust |
| ⚡ Lightning Reflexes | Clicks rápidos (<300ms promedio) | 4000 monedas + 3 gemas |

---

## 📅 Eventos diarios

Cada día de la semana trae un bonus especial:

| Día | Evento | Bonus |
|-----|--------|-------|
| Lunes | 🪙 Golden Rush | ×2 Monedas |
| Martes | ✨ Stardust Rain | ×2 Stardust + 25% drop chance |
| Miércoles | ⚔️ Critical Frenzy | +20% Crit Chance |
| Jueves | 📚 XP Boost Festival | ×3 XP |
| Viernes | 💎 Gem Hunt | +15% Gem Chance |
| Sábado | 🎁 Loot Bonanza | +10% Loot Chance |
| Domingo | 🏰 Tower of Power | ×2 DPS + 15s extra en torre |

---

## 🛠️ Desarrollo

### Tech stack

- **Vite** v7.3.1 — Build tool y dev server
- **Vanilla JavaScript** — ES Modules, sin frameworks
- **CSS puro** — Diseño responsive mobile-first
- **Arquitectura:** GameLoop (100ms tick) → EventBus (pub/sub) → UIManager

### Estructura del proyecto

```
src/
├── main.js              # Entry point
├── style.css            # Estilos globales
├── core/
│   ├── Config.js        # Constantes del juego
│   ├── EventBus.js      # Sistema de eventos pub/sub
│   ├── GameLoop.js      # Motor principal (10 ticks/s)
│   ├── GameState.js     # Estado persistente + save/load
│   └── Utils.js         # Utilidades compartidas
├── entities/
│   ├── AchievementDatabase.js   # 78 logros (8 secretos)
│   ├── BossRushDatabase.js      # Modo Boss Rush
│   ├── CollectionDatabase.js    # 6 colecciones
│   ├── CraftingDatabase.js      # Sistema de forge
│   ├── DailyLoginDatabase.js    # Recompensas diarias
│   ├── ElementDatabase.js       # 5 elementos + efectos
│   ├── EnemyDatabase.js         # 20+ enemigos
│   ├── EventDatabase.js         # 7 eventos semanales
│   ├── ExpeditionDatabase.js    # 6 regiones de expedición
│   ├── GuideDatabase.js         # Guías in-game
│   ├── HeroActiveSkills.js      # Habilidades activas
│   ├── HeroDatabase.js          # 12 héroes + stats
│   ├── ItemDatabase.js          # 16 ítems + prefijos
│   ├── LoreDatabase.js          # 18 entradas narrativas
│   ├── MilestoneDatabase.js     # Hitos de progresión
│   ├── MiniGameDatabase.js      # 3 mini-juegos
│   ├── PetDatabase.js           # 6 mascotas Synthari
│   ├── PrestigeDatabase.js      # 8 mejoras de prestige
│   ├── QuestDatabase.js         # Misiones diarias/semanales
│   ├── ShopDatabase.js          # 22 artículos de tienda
│   ├── SkillDatabase.js         # Árbol de habilidades
│   ├── SpinWheelDatabase.js     # Ruleta de premios
│   ├── SynergyDatabase.js       # Sinergias de equipo
│   ├── TowerDatabase.js         # 12 pisos de torre
│   └── UpgradeDatabase.js       # 20 mejoras de academia
└── ui/
    └── UIManager.js       # Renderizado y UI completa
```

### Ejecutar en local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build
```

---

## 🗺️ Roadmap

Consulta [ROADMAP.md](ROADMAP.md) para el plan completo de desarrollo con 5 fases y 10+ ideas bonus.

**Estado actual — v0.9.2:**
- ✅ Fase 1 parcial (Ascensión, Elementos, Élites)
- ✅ Fase 2 parcial (Crafting, Misiones, Expediciones, Prefijos)
- ✅ Boss Rush, Logros secretos
- 🔮 Próximo: Runas, Dungeons, Prestige 2.0

---

## 📊 Contenido actual

| Tipo | Cantidad |
|------|----------|
| Héroes | 12 |
| Enemigos | 20+ |
| Ítems | 16 (+10 prefijos) |
| Pisos de torre | 12 |
| Logros | 78 (8 secretos) |
| Mascotas | 6 |
| Mini-juegos | 3 |
| Misiones | 3 diarias + 2 semanales |
| Regiones de expedición | 6 |
| Eventos | 7 (uno por día) |
| Colecciones | 6 |
| Mejoras de academia | 20 |
| Mejoras de prestige | 8 |

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'feat: descripción'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

---

## 📜 Licencia

MIT — libre para uso personal y comercial.

---

*"En Midnight Gardens, la luna no se pone. La oscuridad no gana. Mientras haya un Arquitecto que recuerde la luz... el jardín sobrevive."*
