"use client"

import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { MousePointerSquareDashed, Image, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Dropzone, {FileRejection} from "react-dropzone"

const Page = () => {
    const { toast } = useToast()
    const [isDragOver, setIsDragOver] = useState<boolean>(false) 
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const router = useRouter()

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configID
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`)
            })
        },
        onUploadProgress(p){
            setUploadProgress(p)
        }
    })

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles

        setIsDragOver(false)

        toast({
            title: `${file.file.type} тип не поддерживается.`,
            description: "Вместо этого выберите изображение PNG, JPG или JPEG.",
            variant: "destructive"
        })
    }

    const onDropAccepted = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, {configId: undefined})

        setIsDragOver(false)
    }

    
    const [isPending, startTransition] = useTransition()

    return (
        <div className={cn("relative size-full flex-1 my-16 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",{
            "ring-blue-900/25 bg-blue-900/10" : isDragOver,
        })}>
            <div className="relative flex flex-1 flex-col items-center justify-center w-full">
                <Dropzone onDropRejected={onDropRejected} onDropAccepted={onDropAccepted} accept={{
                    "image/png" : [".png"],
                    "image/jpeg" : [".jpeg"],
                    "image/jpg" : [".jpg"],
                }} onDragEnter={() => setIsDragOver(true)} onDragLeave={() => setIsDragOver(false)}>
                    {({getRootProps, getInputProps}) => (
                        <div className="size-full flex-1 flex flex-col items-center justify-center" {...getRootProps()}>
                            <input {...getInputProps()} />  
                            {isDragOver ? <MousePointerSquareDashed className="size-6 text-zinc-500 mb-2"/> : isUploading || isPending ? <Loader2 className="animate-spin siz-6 text-zinc-500 mb-2"/> : <Image className="size-6 text-zinc-500 mb-2"/>}
                            <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                                {isUploading ? (
                                <div className="flex flex-col items-center">
                                    <p>Загрузка...</p>
                                    <Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-gray-300"/>
                                </div> 
                                ) : isPending ? (
                                <div className="flex flex-col items-center">
                                    <p>Перенаправление, пожалуйста подождите...</p>
                                </div> 
                                ) : isDragOver ? (
                                    <p>
                                        <span className="font-semibold">Перетащите файл</span>{" "}
                                        загрузить
                                    </p>
                                 
                                ) : (
                                    <p>
                                        <span className="font-semibold">Нажмите чтобы загрузить</span>{" "}
                                        или перетащите
                                    </p>
                                )}
                            </div> 

                            {isPending ? null : <p className="text-xs text-zinc-500"> PNG, JPG, JPEG</p>}
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    )
}

export default Page