import fs from 'node:fs'
import path from 'node:path'

function vitePluginsHRM() {
  return {
    name: 'wujie',
    handleHotUpdate({ file }: { file: string }) {
      try {
        if (file.includes('demolist') && file.includes('.vue')) {
          const p = path.resolve(__dirname, '../pages/demolist')
          fs.readdir(p, (err, files) => {
            if (err)
              return

            const jsondata = files.reduce<Record<string, string>>((prev, cur) => {
              if (cur.includes('.vue'))
                prev[cur.replace('.vue', '')] = cur.replace('.vue', '')

              return prev
            }, {})

            fs.writeFileSync(path.resolve(__dirname, '../pages/demolist/list.json'), JSON.stringify(jsondata))
          })
        }
      }
      catch (error) {
        console.log(error)
      }
    },
  }
}

export default vitePluginsHRM
