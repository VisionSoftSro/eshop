package org.visionsoft

import java.io.File



fun main() {
    val path =  "./c-frontend/src/web/assets/product-img/"
    val directory = File(path)
    if(directory.isDirectory) {
        directory.list()?.forEach {d ->
            val dir = File("$path$d")
            if (dir.isDirectory) {
                    val filesToRename = mutableListOf<File>()
                    dir.listFiles()?.forEach { file ->
                        if(file.isFile && !file.isHidden) {
                            //prevent from renaming to other file which cause removing target file
                            val f = File("$path$d/${file.hashCode()}.jpg")
                            file.renameTo(f)
                            filesToRename.add(f)
                        }
                    }
                    var index = 0
                    filesToRename.forEach {
                        it.renameTo(File("$path$d/${index++}.jpg"))
                    }
            }
        }
    }
}