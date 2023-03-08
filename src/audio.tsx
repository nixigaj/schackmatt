export class GameSounds {
    plopp: AudioPlayer
    wohoo: AudioPlayer
    oh_nono: AudioPlayer

    constructor() {
        this.plopp = new AudioPlayer("sound/plopp.wav")
        this.wohoo = new AudioPlayer("sound/wohoo.wav")
        this.oh_nono = new AudioPlayer("sound/oh-nono.wav")
    }

    playMove() {
        this.plopp.play()
    }
    playCheckmate() {
        this.wohoo.play()
    }
    playCheck() {
        this.oh_nono.play()
    }
}

class AudioPlayer {
    audioElement: HTMLAudioElement;

    constructor(file: string) {
        this.audioElement = new Audio(file);
    }

    play() {
        this.audioElement.play()
    }
}
