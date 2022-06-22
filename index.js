import { musicScripts } from "./music-scripts.js";

(async ()=>{

    let GreenAudioInstance = null;
    let audioElement = document.getElementById("audio");

    const playSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 24">
        <path fill="#fff" fill-rule="evenodd" d="M18 12L0 24V0" class="play-pause-btn__icon"></path>
    </svg>`;

    const pauseSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 24">
        <path fill="#fff" fill-rule="evenodd" d="M0 0h6v24H0zM12 0h6v24h-6z" class="play-pause-btn__icon"></path>
    </svg>`;

    const music_tools = new musicScripts(
        {
            musics: await(await fetch("musics.json")).json(),
            targetAudio: document.getElementById("audio"),
            targetMenu: document.getElementById("musics-list"),
            targetMusicImg: document.getElementById("selected-music-img"),
            targetMusicName: document.getElementById("selected-music-name"),
            targetMusicArtist: document.getElementById("selected-music-artist"),
            onInit: ()=>{
            },
            onMusicChanged: ()=>{
                document.querySelector(".menu-music.selected .play-pause-container").innerHTML = playSvg;

                document.querySelector(".selected").classList.remove("selected");
                document.querySelector(`[data-light-search="${music_tools.selectedMusic}"]`).classList.add("selected");

                document.querySelector(".play-pause-btn").click();
            },
            onMusicPlayed: ()=>{
                document.querySelector(".menu-music.selected .play-pause-container").innerHTML = pauseSvg;
            },
            onMusicPaused: ()=>{
                document.querySelector(".menu-music.selected .play-pause-container").innerHTML = playSvg;
            }
        }
    );


    // open and close menu
    const open_musical_menu = document.querySelector(".musical-icon");
    const music_container = document.getElementById("music-container");
    const menu_column = document.getElementById("menu-column");
    const music_column = document.getElementById("music-column");
    const close_menu = document.getElementById("close-menu");

    open_musical_menu.addEventListener("click", ()=>{
        menu_column.classList.replace("hidden-menu", "show-menu");
    });

    close_menu.addEventListener("click", ()=>{
        menu_column.classList.replace("show-menu", "hidden-menu");
    });


    // light search
    const search_input = document.getElementById("search-music");
    const results = document.querySelectorAll(".menu-music");
    lightSearch(search_input, results, {
        display: "flex"
    });

})();