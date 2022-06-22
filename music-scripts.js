class musicScripts{
    constructor(ops) {
        // musics,
        // targetAudio,
        // targetMenu,
        // targetMusicImg,
        // targetMusicName,
        // targetMusicArtist,
        // onInit = null,
        // onMusicChanged = null,
        // onMusicPaused = null,
        // onMusicPlayed = null

        this.musics = ops.musics;
        this.musics_list = Object.keys(this.musics);
        this.targetAudio = null;
        this.SetTargetAudio("audio");
        this.targetMenu = ops.targetMenu;
        this.targetMusicImg = ops.targetMusicImg;
        this.targetMusicName = ops.targetMusicName;
        this.targetMusicArtist = ops.targetMusicArtist;
        this.selectedMusic = null;
        this.onMusicChanged = ops.onMusicChanged || null;
        this.onInitialized = ops.onInit || null;
        this.onMusicPaused = ops.onMusicPaused || null;
        this.onMusicPlayed = ops.onMusicPlayed || null;
        this.playpausebtn = null;

        this.RandomlySelectMusic();
        this.setView();
        this.loadMusics_in_menu();

    }

    loadMusics_in_menu() {
        for(let music in this.musics){
            const template = `
                <div class="menu-music" data-light-search="${music}">
                    <img src="music-images/menu/${music}.jpg" class="menu-music-img">
                    <div class="menu-music-name_artist">
                        <h1>${music}</h1>
                        <h2>${this.musics[music]}</h2>
                    </div>
                    <div class="play-pause-container blob-6" data-target-music="${music}">
                        <img src="icons/play-button-24.png" class="play-pause blob-6">
                    </div>
                </div>
            `;
            this.targetMenu.innerHTML += template;
        }

        document.querySelector(`[data-light-search="${this.selectedMusic}"]`).classList.add("selected");

        document.querySelectorAll("div[data-target-music]").forEach(menu_play_pause_btn => {
            menu_play_pause_btn.addEventListener("click", e => {
                if(menu_play_pause_btn.getAttribute("data-target-music") == this.selectedMusic){
                    document.querySelector(".play-pause-btn").click();
                }
                else{
                    this.selectedMusic = menu_play_pause_btn.getAttribute("data-target-music");
                    document.querySelector(".music-controlers").innerHTML = null;
                    
                    const t = document.createElement("audio");
                    t.setAttribute("id", "audio");
                    document.querySelector(".music-controlers").appendChild(t);
                    this.SetTargetAudio("audio");

                    this.setView();
                    (this.onMusicChanged || (()=>{}))(menu_play_pause_btn);
                }
            });
        });
    }

    setView() {
        this.targetMusicImg.setAttribute("src" , "music-images/main/" + this.selectedMusic + ".jpg");
        this.targetMusicName.innerText = this.selectedMusic;
        this.targetMusicArtist.innerText = this.musics[this.selectedMusic];
        
        this.targetAudio.innerHTML = null;
        this.targetAudio.appendChild(this.makeSourceElement({
            tyep: "audio/mpeg",
            src: "musics/" + this.selectedMusic + ".mp3"
        }));

        this.initGreenAudio();

        (this.onInitialized || (()=>{}))();
    }

    initGreenAudio() {
        new GreenAudioPlayer(".music-controlers", {
            showDownloadButton: true
        });
        this.SetTargetAudio("audio");
        this.init_OnPause_OnPlay();
    }

    makeSourceElement(attrs) {
        const source = document.createElement("source");
        for(let attr in attrs){
            source.setAttribute(attr, attrs[attr]);
        }
        return source;
    }

    RandomlySelectMusic() {
        this.selectedMusic = this.musics_list[this.randomInt(0, this.count)];
    }

    randomInt(min, max) {
        return Math.floor(Math.random()*(max-min)+min);        
    }

    init_OnPause_OnPlay() {
        this.playpausebtn = document.querySelector(".play-pause-btn");
        this.playpausebtn.addEventListener("click", ()=>{
            this.playpausebtn.getAttribute("aria-label") == "Play"
            ?
            (this.onMusicPaused || (()=>{}))()
            :
            (this.onMusicPlayed || (()=>{}))();
        });
    }

    get count() {
        if(this.length){
            return this.length;
        }
        this.length = this.musics_list.length;
        return this.length;
    }

    SetTargetAudio(id) {
        this.targetAudio = document.getElementById(id);
    }
}

export { musicScripts } ;