export interface Section {
  id: string;
  title: string;
  content: string[];
  highlights?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  category: string;
  sections: Section[];
}

export const chapters: Chapter[] = [
  {
    id: "evropa-splosno",
    title: "Naša celina Evropa — naravnogeografske značilnosti",
    category: "Evropa splošno",
    sections: [
      {
        id: "lega",
        title: "1. Lega Evrope",
        content: [
          "Evropa leži v celoti na severni polobli, zato je večina Evrope v severnem zmerno toplem pasu.",
          "Večji del Evrope leži na vzhodni polobli, manjši del na zahodni.",
          "Evropa in Azija skupaj sestavljata Evrazijo, saj je prehod med njima skoraj neopazen in meja ni naravna ampak dogovorjena.",
          "Meja med Evropo in Azijo poteka po gorovju Ural, reki Ural, Kaspijskem jezeru, Maniškem podolju, Črnem morju ter morskih ožinah Bospor in Dardanele.",
          "Meja z Afriko poteka po Sredozemskem morju in skozi Gibraltarska vrata."
        ],
        highlights: ["Evrazija", "Ural", "Kaspijsko jezero", "Bospor", "Dardanele", "Gibraltarska vrata"]
      },
      {
        id: "povrsje-obale",
        title: "2. Površje in obale",
        content: [
          "Evropa ima zelo razčlenjene obale z velikimi zalivi, polotoki, otoki in morji.",
          "Skandinavski polotok na severu, Islandija v Atlantiku, Britansko otočje na zahodu.",
          "Severno morje, Baltsko morje, Sredozemsko morje, Črno morje.",
          "Veliki polotoki na jugu: Iberski, Apeninski, Balkanski.",
          "Veliki otoki v Sredozemskem morju: Sicilija, Sardinija, Korzika."
        ],
        highlights: ["Skandinavski polotok", "Britansko otočje", "Severno morje", "Baltsko morje", "Iberski polotok", "Apeninski polotok", "Balkanski polotok", "Sicilija", "Sardinija", "Korzika"]
      },
      {
        id: "tipi-povrsja",
        title: "Tipi površja",
        content: [
          "Površje Evrope delimo na 3 tipe:",
          "• Velika nižavja (Vzhodnoevropsko nižavje)",
          "• Stara gorovja in planote",
          "• Mlada nagubana gorovja: Pireneji, Apenini, Alpe, Karpati"
        ],
        highlights: ["Vzhodnoevropsko nižavje", "Pireneji", "Apenini", "Alpe", "Karpati"]
      },
      {
        id: "podnebje",
        title: "Podnebje in rastlinstvo",
        content: [
          "Večina Evrope leži v zmerno toplem pasu. Poznamo dva tipa podnebja:",
          "Oceansko podnebje imajo dežele v bližini Atlantskega oceana. Zime so mile, poletja blaga. Padavine so enakomerno porazdeljene čez vse leto. Tu uspeva listnati gozd.",
          "Celinsko podnebje je značilno za notranjost celine. Poletja so vroča, zime pa mrzle. Višek padavin je poleti. Travnato pokrajino v vzhodnem delu imenujemo stepa.",
          "Skrajni sever Evrope sega v mrzli pas. Tam je za gozd premrzlo, zato uspeva le tundrsko rastlinstvo (mahovi, lišaji, grmičevja, zelišča). To podnebje imenujemo tundrsko podnebje.",
          "Južni del Evrope ob Sredozemskem morju sega v subtropski toplotni pas in ima sredozemsko podnebje z vročimi in suhimi poletji ter deževnimi milimi zimami. Tam uspeva značilno zimzeleno grmovno sredozemsko rastlinstvo.",
          "V gorskem delu Evrope imamo posebno vrsto podnebja — gorsko podnebje, ki ima zaradi večje nadmorske višine nižje temperature in več padavin. Tam uspeva gorsko rastlinstvo."
        ],
        highlights: ["oceansko podnebje", "celinsko podnebje", "tundrsko podnebje", "sredozemsko podnebje", "gorsko podnebje", "listnati gozd", "stepa", "tundrsko rastlinstvo", "makija"]
      },
      {
        id: "drustvo",
        title: "Družbena raznolikost Evrope",
        content: [
          "Evropa je različno gosto poseljena. Gostejše je poseljeno Britansko otočje, Srednja Evropa, obrobne nižine in obale. Redkeje je poseljen sever Evrope, gorski predeli in deli Vzhodne Evrope.",
          "V Evropi živi veliko narodov, ki so si ustvarili svoje države. Nekateri evropski narodi nimajo svojih držav (Katalonci, Baski). V mnogih evropskih državah živijo številne narodne manjšine.",
          "Jezikovne skupine: romanski jeziki (južna Evropa), germanski jeziki (zahodna, severna in srednja Evropa), slovanski jeziki (vzhodna in srednja Evropa), albanski jeziki.",
          "Verska sestava: najbolj razširjena vera je krščanstvo. Kristjani se delijo na katoličane, protestante in pravoslavne. Vedno bolj je prisoten tudi islam (muslimani).",
          "Najpomembnejša skupnost, ki povezuje evropske države, je Evropska unija (27 držav)."
        ],
        highlights: ["narodne manjšine", "romanski jeziki", "germanski jeziki", "slovanski jeziki", "katoličani", "protestanti", "pravoslavni", "Evropska unija", "27 držav"]
      },
      {
        id: "zemljevid-vaja",
        title: "Vaja — označevanje na zemljevidu",
        content: [
          "Otoki: 1) Islandija, 2) Sicilija, 3) Sardinija, 4) Korzika",
          "Otočje: 5) Britansko otočje",
          "Polotoki: 6) Skandinavski, 7) Iberski, 8) Apeninski, 9) Balkanski",
          "Morja: A) Črno morje, B) Sredozemsko morje, F) Baltsko morje, G) Marmarsko morje",
          "Ocean: C) Atlantski ocean",
          "Morske ožine: Č) Severno morje, D) Dardanele, E) Gibraltarski preliv"
        ],
        highlights: ["Islandija", "Sicilija", "Sardinija", "Korzika", "Britansko otočje", "Iberski polotok", "Apeninski polotok", "Balkanski polotok", "Atlantski ocean", "Dardanele", "Gibraltarski preliv"]
      }
    ]
  },
  {
    id: "j-jv-evropa",
    title: "Južna in Jugovzhodna Evropa",
    category: "J/JV Evropa",
    sections: [
      {
        id: "sredozemlje",
        title: "Sredozemlje",
        content: [
          "Sredozemlje je edinstvena geografska celota, ker ga sestavljajo trije veliki polotoki: Apeninski, Pirenejski in Balkanski.",
          "Osrednje morje je Sredozemsko ali Mediteran. Ob njem ležijo tri celine: Evropa, Afrika in Azija. Stranska morja so Jadransko, Jonsko, Egejsko, Tirensko, Ligursko in Alboransko.",
          "Južna Evropa je zibelka grške in rimske civilizacije. Sredozemlje je bilo od antike do 15. stoletja križišče in stičišče najpomembnejših pomorskih in kopnih poti.",
          "Pomen Sueškega prekopa (1869): skrajšal pomorsko pot do Azije.",
          "Pomen ožin: Bospor in Dardanele povezujeta Sredozemlje s Črnim morjem; Gibraltarska vrata z Atlantikom.",
          "V Južno Evropo uvrščamo značilne sredozemske države: Španija, Portugalska, Grčija, Italija, Malta, Ciper.",
          "Manj značilne sredozemske države (Jugovzhodna Evropa): Hrvaška, Bosna in Hercegovina, Črna gora, Albanija, Bolgarija, Romunija. Države brez morja: Srbija, Kosovo in Makedonija."
        ],
        highlights: ["Sredozemlje", "Apeninski polotok", "Pirenejski polotok", "Balkanski polotok", "Sueški prekop", "Bospor", "Dardanele", "Gibraltarska vrata", "Španija", "Portugalska", "Grčija", "Italija", "Malta", "Ciper"]
      },
      {
        id: "povrsje-j-jv",
        title: "Površje Južne in Jugovzhodne Evrope",
        content: [
          "V Južni in Jugovzhodni Evropi se nahajajo verige mladonagubanih gorovij. Ta gorovja so zelo visoka, strma, težkoprehodna in imajo značilno slemenitev.",
          "Pireneji — mladonagubano gorovje med Francijo in Španijo, zato ime Pirenejski polotok. V osrednjem delu Španije leži planota Meseta, na jugu pa gorovje Sierra Nevada.",
          "Apenini — mladonagubano gorovje na Apeninskem polotoku (Italija). Na severu Italije ležijo Alpe. Med obema gorovjema je Padska nižina (reka Pad).",
          "Balkan — mladonagubano gorovje na Balkanskem polotoku. Tukaj leži tudi Dinarsko gorstvo, Šarsko Pindsko gorstvo. V Romuniji ležijo Karpati. Tukaj se nahaja tudi del Panonske nižine in Vlaška nižina. Rodopi so staro nagubano gorovje.",
          "Večina mladonagubanih gorovij gradi apnenec, zato so tu pogosti kraški pojavi."
        ],
        highlights: ["Pireneji", "Meseta", "Sierra Nevada", "Apenini", "Alpe", "Padska nižina", "Dinarsko gorstvo", "Šarsko Pindsko gorstvo", "Karpati", "Panonska nižina", "Vlaška nižina", "Rodopi", "apnenec", "kraški pojavi"]
      },
      {
        id: "potresi-vulkani",
        title: "Potresi in vulkani",
        content: [
          "Na območju južne in jugovzhodne Evrope gubanja in premikanja zemljine skorje še vedno potekata, zato so tu pogosti potresi in vulkanski izbruhi.",
          "Potres je nenadno in pogosto silovito tresenje zemljinega površja zaradi premikanja zemljinih plošč. Posledice so katastrofalne: rušenje stavb, uničena mesta. Stavbe morajo zato na potresno nevarnih območjih graditi tako, da so potresno varne.",
          "Seizmograf je instrument za merjenje potresnih valov.",
          "Epicenter je točka na zemljinem površju, kjer so potresni sunki najmočnejši.",
          "Vulkani ali ognjeniki nastanejo, ko raztopljene kamnine (magma) zaradi velikega pritiska izbruhnejo iz notranjosti na površje (lava).",
          "Lava se na površju odlaga v plasteh in oblikuje vulkanski stožec. Na vrhu se je lijaku podobna tvorba — žrelo ali krater. Ob izbruhu pridejo na površje lava, strjeni kosi kamnin, vroči plini in pepel.",
          "Prst, ki se razvije na ugasli lavi in pepelu, je zelo rodovitna.",
          "Najbolj znana vulkana v Južni Evropi sta Vezuv nad mestom Neapelj in Etna na otoku Sicilija."
        ],
        highlights: ["potres", "seizmograf", "epicenter", "vulkan", "ognjenik", "magma", "lava", "vulkanski stožec", "žrelo", "krater", "Vezuv", "Neapelj", "Etna", "Sicilija"]
      }
    ]
  },
  {
    id: "sredozemsko-morje",
    title: "Sredozemsko morje",
    category: "Sredozemlje",
    sections: [
      {
        id: "značilnosti",
        title: "Značilnosti Sredozemskega morja",
        content: [
          "Sredozemsko morje je medcelinsko.",
          "Zelo razčlenjeno (stranska morja, otoki, polotoki ...).",
          "Dokaj toplo morje: poleti 27 °C, pozimi 12 °C.",
          "Zelo slano: 38 ‰ promil — 1 liter vsebuje 38 g soli.",
          "Lepe modre barve in prozorno (malo planktona).",
          "Vse bolj onesnaženo.",
          "Vedno bolj gosto poseljeno."
        ],
        highlights: ["medcelinsko", "38 ‰", "plankton"]
      },
      {
        id: "tople-vode",
        title: "Zakaj je Sredozemsko morje toplo?",
        content: [
          "Zaradi lege (blizu je severni povratnik).",
          "Zaradi ozke in plitve povezanosti z mrzlim Atlantikom pri Gibraltarskih vratih.",
          "Skozi ta vrata priteka predvsem toplejša voda iz zgornjih plasti oceana."
        ],
        highlights: ["severni povratnik", "Gibraltarska vrata"]
      },
      {
        id: "tokovi",
        title: "Morski tokovi",
        content: [
          "Glavni morski tokovi tečejo skozi Gibraltarska vrata in nato ob obali Afrike proti vzhodu.",
          "Ob obali Turčije se obrnejo in se po obalah Evrope vračajo proti zahodu."
        ],
        highlights: ["Gibraltarska vrata"]
      },
      {
        id: "onesnazevanje",
        title: "Onesnaževanje Sredozemskega morja",
        content: [
          "V Sredozemsko morje izlivajo velike zelo onesnažene reke. Reka Pad je s številnimi kanali speljana med intenzivno obdelanimi površinami v severni Italiji (gnojila, škropiva, promet ...).",
          "Zelo veliko je prometa (ladje, tankerji, potniški promet). Številna pristanišča, naftovodi, plinovodi. V primeru nesreč je onesnaževanje še večje.",
          "Gosta poseljenost obal: zaradi ugodnega podnebja, bližine morja, prometne povezanosti (Barcelona, Atene, Trst ...).",
          "Množični turizem: velika poraba vode, hrane, veliko smeti."
        ],
        highlights: ["reka Pad", "Barcelona", "Atene", "Trst"]
      },
      {
        id: "vzroki-posledice",
        title: "Vzroki in posledice onesnaženja",
        content: [
          "1) Pritočni onesnaženih rek: npr. reka Pad teče skozi industrializirane in kmetijsko najbolj intenzivno obdelane pokrajine. Posledica: onesnažena obala in morje, neprimerna voda za kopanje, povzroča vnetja, ogroženost turizma.",
          "2) Množični turizem: samo poleti pride na obale okrog 200 milijonov turistov. Posledica: pomanjkanje neonesnažene narave za počitek.",
          "3) Gosto poseljena obalna območja: na 46.000 km obale živi več kot 143 milijonov ljudi, veliko okolij nima prečiščevalnih naprav. Posledica: v morje steče obilo gospodinjskih in industrijskih odplak (nitrati, fosfati), pojav cvetenja morja.",
          "4) Pretiran ulov rib: povečan ulov in uporaba tehnik (koče), ki uničujejo morsko dno. Posledica: grozi izumrtje nekaterih vrst rib (npr. navaden tun), uničenje ekosistemov v Tržaškem zalivu.",
          "5) Ladijski promet in nesreče tankerjev: izvržejo velike količine odpadkov, pomanjkanje naprav za čiščenje odpadnih olj. Posledica: razlitje nafte, pogin morskih živali, velika ekološka in finančna škoda."
        ],
        highlights: ["200 milijonov turistov", "46.000 km obale", "143 milijonov ljudi", "navaden tun", "Tržaški zaliv", "cvetenje morja"]
      }
    ]
  },
  {
    id: "j-podnebje",
    title: "Južna Evropa: podnebje, rastlinstvo in kmetijstvo",
    category: "J Evropa",
    sections: [
      {
        id: "sredozemsko-podnebje",
        title: "Sredozemsko podnebje in rastlinstvo",
        content: [
          "Pravo sredozemsko podnebje doseže le obale in otoke Sredozemskega morja. Gorovja do morske obali predstavljajo ostro klimatsko pregrado proti severu.",
          "Zahodna območja imajo več padavin kot vzhodna. Značilna so dolga vroča poletja in mile vlažne zime.",
          "Rastlinstvo se je prilagodilo na podnebje: večina rastlin ima globoke korenine in liste, zaščitene pred preveliko izgubo vode.",
          "Od naravnega rastlinstva je nekoč prevladoval gozd zimzelenega hrasta puharca, bora in ciprese. Danes se je ohranil le v odmaknjenih, težko dostopnih predelih.",
          "Obsežni domovji prerasta nizko zimzeleno grmičevje — makija.",
          "Pomembne kulturne rastline: oljka, vinska trta, oranževec, limonovec, mandljevec, aromatične rastline (lovor, origano, žajbelj, sivka, rožmarin) in vrtnine.",
          "V živinoreji prevladuje ovčjereja in kozjereja.",
          "Prsti so v Južni Evropi različne: prsti na rečnih naplavinah (človek jih je spremenil v rodovitne), vulkanske prsti (izjemno rodovitne), rdeče slabše rodovite prsti kot npr. jerovica.",
          "Reke imajo poleti zaradi suše malo vode. Nekatere celo presahnejo. Daljše reke, ki izvirajo visoko v gorah, so zajezili. Na jezovih so zbirna (akumulacijska) jezera, ki jih izkoriščajo za namakanje in pridobivanje električne energije.",
          "Danes največ zgodnje zelenjave pridelajo v velikih plastičnih rastlinjakih, ki ponekod prekrivajo cela območja (npr. v Španiji).",
          "Portugalska je znana po pridelavi plute iz skorje hrasta plutovca."
        ],
        highlights: ["makija", "oljka", "vinska trta", "jerovica", "akumulacijska jezera", "plastični rastlinjaki", "hrast plutovec", "Pluta", "ovčjereja", "kozjereja"]
      },
      {
        id: "jv-podnebje",
        title: "Podnebje Jugovzhodne Evrope",
        content: [
          "V Jugovzhodni Evropi je podnebje že bolj celinsko. Zime so mrzle, poletja pa vroča.",
          "V nižinah je bila nekoč naravna stepa, v goratih predelih pa gozd. Stepa je spremenjena v polja.",
          "Obsežnejši gozdovi so v gorah. V Panonski nižini je rodovitna prst — puhlica.",
          "Sava in Donava odvajata vode s tega območja v Črno morje."
        ],
        highlights: ["stepa", "puhlica", "Sava", "Donava", "Črno morje"]
      },
      {
        id: "turizem",
        title: "Turizem in promet v Južni Evropi",
        content: [
          "Turizem je za večino držav Južne Evrope zelo pomembna gospodarska panoga. Turisti prihajajo zaradi toplega morja, vročega in sončnega podnebja, zabave, dobre hrane, počitka, zdravja, naravnih in kulturnih znamenitosti.",
          "Zaradi množičnega obiska turistov govorimo o množičnem turizmu. Vsako poletje obišče Južno Evropo milijone turistov iz drugih delov Evrope in sveta.",
          "Prednosti množičnega turizma: domačini dobijo zaposlitev, učijo se tujih jezikov in običajev, krepijo strpnost do drugačnih, ostanejo v domačem okolju.",
          "Slabosti množičnega turizma: onesnaženost Sredozemskega morja, pomanjkanje pitne vode, spremenjen način življenja domačinov, opuščeni tradicionalni poklici (ribolov, kmetijstvo), razprodaja in pozidava obale."
        ],
        highlights: ["množični turizem", "milijone turistov", "ribolov", "kmetijstvo", "pozidava obale"]
      }
    ]
  },
  {
    id: "srednja-evropa",
    title: "Srednja Evropa",
    category: "Srednja Evropa",
    sections: [
      {
        id: "sre-splosno",
        title: "Splošne značilnosti",
        content: [
          "Srednja Evropa ima prehodno lego. Skupina držav, ki sestavlja Srednjo Evropo, leži med zahodom in vzhodom ter severom in jugom Evrope.",
          "Deli se na pet naravnih enot:",
          "• Nemško-Poljsko nižavje na severu",
          "• Sredogorja s kotlinami",
          "• Na vzhodu: mlado nagubani Zahodni Karpati",
          "• Na jugu: Alpe",
          "• Panonska nižina / kotlina",
          "Nemško-Poljsko nižavje, Panonska kotlina in sredogorja so zelo primerni za naselitev in imajo dobre prometne povezave. Alpe so bile v preteklosti ovira za promet. Danes so prometno dobro prepredene s sodobnimi prometnicami.",
          "Podnebje Srednje Evrope je prehodno: SZ del ima oceansko podnebje, sredina celinsko, Alpe in Z. Karpati pa gorsko podnebje.",
          "Srednjeevropski narodi so si po kulturi zelo podobni, različni pa v gospodarski razvitosti. Povezuje jih skupna večstoletna zgodovina (Nemško cesarstvo in Habsburška monarhija).",
          "V Srednji Evropi so nastala pomembna industrijska središča na nahajališčih premoga in rud v uravnanih sredogorjih.",
          "Celinske države: Švica, Liechtenstein, Avstrija, Madžarska, Češka, Slovaška. Obmorske: Nemčija, Poljska, Slovenija.",
          "Jeziki: germanska, slovanska in ugrofinska skupina. Večina govori nemško, manjši del francosko, italijansko in retoromansko. Manjšine: Lužiški Srbi, Madžari, Romi.",
          "Vera: večinoma katoličani, v Švici in Nemčiji tudi protestanti."
        ],
        highlights: ["prehodna lega", "Nemško-Poljsko nižavje", "Zahodni Karpati", "Panonska kotlina", "Nemško cesarstvo", "Habsburška monarhija", "Lužiški Srbi", "Romi", "retoromansko"]
      },
      {
        id: "naravne-enote",
        title: "Naravne enote Srednje Evrope",
        content: [
          "a) Mlada ali slemenasta gorovja (nastala v kenozoiku / terciarju): Alpe in Zahodni Karpati.",
          "b) Stara ali grudasta gorovja s kotlinami (nastala v paleozoiku): Schwarzwald, Češko nadgorje, Moravska planota, Spodnja Renska dolina (Renski tektonski jarek), Švabsko-bavarska planota.",
          "c) Nižine in kotline:",
          "   • Nemško-poljsko nižavje: nastalo z ledeniškim preoblikovanjem v ledeni dobi pleistocen. Reke: Laba, Odra, Visla.",
          "   • Panonska kotlina: nastala s tektonskim ugreznjenjem med dvigajočimi mladimi gorovji v dobi terciar. Reke: Donava, Tisa, Sava, Drava."
        ],
        highlights: ["kenozoik", "terciar", "paleozoik", "pleistocen", "Schwarzwald", "Češko nadgorje", "Moravska planota", "Renski tektonski jarek", "Laba", "Odra", "Visla", "Donava", "Tisa", "Sava", "Drava"]
      },
      {
        id: "alpe",
        title: "Alpe",
        content: [
          "Alpe so najvišje evropsko gorovje, ki se vleče v izrazitem loku od francoskega dela Sredozemlja do Panonske nižine. So nekakšna meja med Srednjo, Zahodno in Južno Evropo.",
          "Izraziti alpski državi sta Švica in Avstrija ter Liechtenstein. Alpe segajo tudi v Francijo, Nemčijo, Italijo in Slovenijo.",
          "Nastanek: Alpe so nastale na območju nekdanjega Sredozemskega morja med Afriško in Evropsko zemljino ploščo. V tem morju so se stotine milijonov let kopičili ostanki odmrlih organizmov in druge usedline, ki so se sčasoma sprijele v debele plasti kamnin. Ko se je afriška celina začela močno premikati proti evropski, so se zaradi pritiska nagubale in dvigale. Nastalo je mlado nagubano gorovje.",
          "Alpe imajo izrazito slemenitev zahod–vzhod.",
          "Ledeniško preoblikovanje: Alpe so bile med ledenimi dobami pokrite z debelim lednim pokrovom. Led je s svojo težo pritiskal na površje, ga odnašal in brusil. Alpski vrhovi so postajali vedno bolj priostreni. Ledeniki so zapolnili nekdanje rečne doline, jih poglobili in razširili. Dobile so značilno koritasto obliko, ki spominja na črko U. Takšne doline imenujemo ledeniška dolina.",
          "V vznožju gora so se ledeniki talili in odlagali obsežne nasipe iz ledeniškega drobirja — ledeniške groblje ali morene. Za njimi so nastala manjša ledeniška jezera. Skrajni spodnji del ledenika, kjer se led najbolj tali, imenujemo ledeniški jezik. Izpod njega teče vedno eden ali več potokov.",
          "Alpe imajo gorsko podnebje in temu prilagojene oblike gospodarstva.",
          "Za gorsko podnebje so značilna hladna podnebja in mrzle ter dolge zime z veliko padavin. Temperatura se z naraščanjem nadmorske višine niža, zato so za Alpe značilni višinski podnebni in rastlinski pasovi ter dve meji: snežna višinska meja in meja gozda.",
          "Najbolj značilna kmetijska dejavnost v Alpah je živinoreja zaradi pašnikov in travnikov. Le-te vzdržuje kmet, zato je to kulturna krajina. Najbolj značilno je planinsko pašništvo: živina je pozimi v hlevih, poleti pa na gorskih pašnikih.",
          "Turizem je tudi značilna alpska dejavnost.",
          "Promet: Alpe so danes prepredene s cestami in železnicami, ki potekajo čez prelaze in skozi predore. Povečan cestni tovorni promet povzroča veliko gnečo in z izpušnimi plini onesnažuje alpsko okolje. V Avstriji in Švici rešujejo ta problem z gradnjo več deset km dolgih železniških predorov skozi gorovje (St. Gotthard in Brenner).",
          "Švica in Avstrija imata visoko razvito industrijo predvsem za zahtevnejše naprave. Švica je znana po urarstvu in bančništvu. V obeh državah so prebivalci zaposleni v različnih storitvenih dejavnostih."
        ],
        highlights: ["najvišje evropsko gorovje", "Afriška zemljina plošča", "Evropska zemljina plošča", "slemenitev", "U-dolina", "ledeniška dolina", "morena", "ledeniški jezik", "snežna višinska meja", "meja gozda", "planinsko pašništvo", "kulturna krajina", "St. Gotthard", "Brenner", "urarstvo", "bančništvo"]
      },
      {
        id: "panonska",
        title: "Panonska kotlina",
        content: [
          "Panonska kotlina (PK) je največja evropska kotlina. Po nastanku je tektonska udornina, nastala med mladonagubanimi gorovji (Alpe, Karpati).",
          "Deli PK so Panonska nižina in osamelci.",
          "Nastanek PK:",
          "a) V kenozoiku (terciar) je potekalo gorotvorno gubanje (mladonagubana gorovja) in tektonsko ugreznjenje površja (kotline).",
          "b) Tektonsko udornino PK je zalilo Panonsko morje.",
          "c) Ostanek Panonskega morja je Blatno jezero na Madžarskem. Ostalo je odteklo s panonskimi rekami (Donava, Tisa, Drava, Sava).",
          "č) Kotlina se polni z različnimi sedimenti ali usedlinami: morski (pesek, prah, glina, melj, blato in ostanki odmrlih rastlin in živali), rečni, ledeniški in veterni.",
          "d) V dobi holocen je bilo več ledenih dob. Severno in večino Srednje Evrope je zajela celinska / kontinentalna poledenitev.",
          "e) Reke in veter so odnašale iz poledenelih delov različno gradivo (prah, pesek) in ga odlagale v PK.",
          "f) Prašnati in peščeni delci so se sprijeli v sedimentno kamnino, imenovano puhlica, ki gradi površje PK. Na njej nastaja rodovitna črna prst — černica.",
          "Panonske reke so pritoki reke Donave, ki teče skozi 9 držav (Slovenija, Nemčija, Avstrija, Madžarska, Hrvaška, Srbija, Bolgarija ...).",
          "Značilnosti panonskih rek: majhen padec / strmec rečnega toka, široke in plitve struge, velike počasne reke, ki tečejo po ravnini, delajo rečne kljuke / rokave — meandre. Mrtvi rečni rokavi / mrtvice nastanejo zaradi regulacije rečne struge. Izliv reke v obliki razdeljenega ustja v več tokov imenujemo delta reke.",
          "Nižina, rodovitna črnica in celinsko podnebje omogočajo rast pšenice, koruze, sladkorne pese in sončnic.",
          "Tipična panonska vas je dolga ali obcestna vas, s kmetijskimi zemljišči v obliki prog ali delcev.",
          "Panonska nižina ima zaradi svoje lege najbolj celinsko podnebje v Srednji Evropi. V takšnem podnebju predvsem ob rekah in na bolj namočenih osamelcih uspevajo listnati gozdovi. Drugod zaradi pomanjkanja padavin uspeva le travniško stepno rastlinstvo (na Madžarskem pusta).",
          "Najbolj rodovitna prst na svetu je černozjom. Madžari gojijo ogromno žitaric, predvsem pšenico in koruzo, pa tudi sončnice. Zelo pomembna je tudi živinoreja.",
          "Na panonskih gričevjih in osamelcih je razvito vinogradništvo."
        ],
        highlights: ["tektonska udornina", "Panonsko morje", "Blatno jezero", "puhlica", "černica", "meander", "mrtvica", "delta", "černozjom", "pusta", "dolga vas", "obcestna vas", "Donava", "Tisa", "Sava", "Drava"]
      },
      {
        id: "sredogorja",
        title: "Sredogorja s kotlinami",
        content: [
          "Sredogorja s kotlinami so nastala z gorotvornim gubanjem v paleozoiku.",
          "Danes so močno znižana, razkosana na grude in vmesne tektonske jarke in udornine, preoblikovana zaradi delovanja zunanjih in notranjih zemeljskih sil.",
          "Zaradi starosti in velike tektonske razkosanosti so sredogorja bogata z nahajališči rud in premogov.",
          "V sredogorjih so nastala pomembna industrijska središča.",
          "Ren je zelo pomembna reka. Izliva se v Severno morje. Ob izlivu leži Rotterdam. Ren je najcenejši prevoz za izdelke po Evropi."
        ],
        highlights: ["paleozoik", "rudniki", "premog", "Ren", "Rotterdam", "Severno morje"]
      },
      {
        id: "donava",
        title: "Donava in Ren",
        content: [
          "Donava je najpomembnejša srednjeevropska reka. NI alpska reka — izvira v Schwarzwaldu (sredogorje). Teče skozi 9 držav in se izliva v Črno morje. Podonavje je območje okoli Donave.",
          "Človek se je pred poplavami rek branil z regulacijo rečne struge. Nastali so mrtvi rokavi — mrtvice.",
          "Ren ima izliv v Severno morje, ob njem leži Rotterdam (delta). Je zelo pomembna prometna pot."
        ],
        highlights: ["Donava", "Schwarzwald", "Podonavje", "mrtvica", "regulacija", "Ren", "Rotterdam"]
      },
      {
        id: "z-evropa-kmet",
        title: "Kmetijstvo zahodnoevropskih držav",
        content: [
          "Kmetijstvo je visoko razvito in specializirano. Naravni pogoji za kmetijstvo so v Zahodni Evropi zelo ugodni.",
          "S kmetijstvom se ukvarja še zelo majhen delež prebivalstva, ki pa pridela velike količine kmetijskih pridelkov.",
          "Število kmetij je zelo majhno, so pa lastniki zelo izobraženi in uporabljajo najnovejšo kmetijsko mehanizacijo in umetna gnojila."
        ],
        highlights: ["specializirano kmetijstvo", "umetna gnojila"]
      }
    ]
  }
];
