class Zomboid {
    config = {
        backupFolder: NL_CWD + '/backup',
        saveFolder: '',
        intervalMinutes: 60
    }
    path = './zomboid-backup.dat'

    interval = null

    constructor() {
        Neutralino.filesystem.readFile(`${this.path}`)
            .then(file => {
                this.config = JSON.parse(file.toString())
                this.init();
            })
            .catch(async err => {
                    if (err.code === 'NE_FS_FILRDER') {
                        Neutralino.filesystem.createDirectory(this.config.backupFolder)
                        this.writeConfig()
                    }
                }
            );
    }


    init = async () => {
        $('#status').text('Initializing...')
        $('#saveFolder').text(this.config.saveFolder)
        $('#interval').val(this.config.intervalMinutes).prop('selected', true)

        // Nothing to do yet
        if (this.config.saveFolder == '') {
            $('#status').text('Save folder not selected!')
            return
        }
        $('#status').text('Ready!')
    }

    stopTimer = async () => {
        if (this.interval !== null) {
            clearInterval(this.interval)
        }
        $('#watchingOrNot').text('')
    }

    initTimer = async () => {
        $('#watchingOrNot').text('')
        if (!this.config.saveFolder) {
            alert('You must enter the path to your Saved folder first.')
            return;
        }

        $('#watchingOrNot').text('Watching...')
        if (this.interval !== null) {
            clearInterval(this.interval)
        }
        this.interval = setInterval(async () => {
            this.backup()
        }, this.config.intervalMinutes * 60000)
    }

    backup = async () => {
        if (this.config.saveFolder === '') return

        $('#status').text('Creating backup...')
        await Neutralino.os.execCommand(`cp -R ${this.config.saveFolder} ${this.config.backupFolder}`);
        $('#status').text(`Backup Completed ${new Date(Date.now()).toLocaleString()}`)
    }

    selectSaveFolder = async () => {
        const folder = await Neutralino.os.showFolderDialog('Select your save directory')
        this.config.saveFolder = folder
        this.writeConfig()
        this.init()
    }

    async writeConfig() {
        return Neutralino.filesystem.writeFile(`${this.path}`, JSON.stringify(this.config))
    }

    async restoreBackup() {
        if (this.config.backupFolder) {
            await this.stopTimer()
            $('#status').text('Timer stopped')
            $('#status').text('Restoring backup...')

            await Neutralino.os.execCommand(`cd ${this.config.backupFolder}/Saves && cp -R . ${this.config.saveFolder}`);

            $('#status').text(`Restoration Completed ${new Date(Date.now()).toLocaleString()}`)

        }
    }

    openBackups() {
        if (this.config.backupFolder) {
            Neutralino.os.open(this.config.backupFolder)
        }
    }
}