import fs from "fs"

class FileManager {

    constructor(path) {
        this.path = path
    }

    read = () => {
        if(fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, "utf-8").then(r => JSON.parse(r))
        }
        return []
    }

    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    getNextID = list => {
        const count = list.length
        return (count > 0) ? list[count-1].id + 1 : 1
    }

    getCode = list => {
      let newCode = Math.floor(Math.random(1) * 10000)
      const verif = list.some(item => item.code === newCode)
      return (verif === true) ? newCode = "ERROR" : newCode
  }


    getById = async (id) => {
        const data = await this.read()
        return data.find(p => p.id == id)
    }

    deleteById = async (id) => {
        const data = await this.read()
        const deleteObj = data.findIndex(o => o.id == id)
        const deleted = data.splice(deleteObj, 1)
        await this.write(data)
        return deleted
    }
    
    get = async () => {
        const data = await this.read()
        return data
    }

    add = async (obj) => {
      const list = await this.read()
      const nextID = this.getNextID(list)
      const code = this.getCode(list)
      obj.id = nextID
      obj.code = code
      list.push(obj)
      await this.write(list)
      return obj
  }

    update = async (id, obj) => {
        obj.id = id
        const list = await this.read()
        for (let i = 0; i < list.length; i++) {
          if (list[i].id == id){
              list[i] = obj
              await this.write(list) 
              break
          }
        }
      }

      updateIdx = async (id,obj) => {
        obj.id = id
        const list = await this.read()
        const idx = list.findIndex(e => e.id == id)
        if(idx < 0) return
        list[idx] = obj
        await this.write(list)
      }
}

export default FileManager