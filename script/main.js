window.isPaused = true
window.initialTime = 3669
window.remainingTime = window.initialTime

function timerStateChange() {
    const stateChangeButton = document.getElementById("control-pause-continue")
    window.isPaused = stateChangeButton.getAttribute("state") === "paused"
    stateChangeButton.innerHTML = window.isPaused ? "Pause": "Start"
    stateChangeButton.setAttribute("state", window.isPaused ? "resumed": "paused")
    window.isPaused = !window.isPaused
}

function toHourMinuteSecond(n_in_secs) {
    const hrs = Math.floor(n_in_secs / 3600)
    n_in_secs -= hrs*3600
    const mins = Math.floor(n_in_secs / 60)
    n_in_secs -= mins*60
    const secs = Math.floor(n_in_secs)

    return [hrs, mins, secs]
}

async function main() {
    const progress = document.getElementById("progress");
    const hdf = document.getElementById("hours-duration-left")
    const mdf = document.getElementById("minutes-duration-left")
    const sdf = document.getElementById("seconds-duration-left")
    var hms
    while (true) {
        hms = toHourMinuteSecond(remainingTime)
        mdf.innerHTML = hms[1].toString().padStart(2, "0")
        hdf.innerHTML = hms[0].toString().padStart(2, "0")
        progress.style.width = `${100 - (remainingTime*100/initialTime)}%`
        sdf.innerHTML = hms[2].toString().padStart(2, "0")
        if (!isPaused && window.remainingTime >= .1) {
            remainingTime -= .1
        }
        await new Promise(r => setTimeout(r, 100));
    }
}

function resetTimer() {
    window.remainingTime = window.initialTime
    const progress = document.getElementById("progress")
    progress.style.width = 0
}