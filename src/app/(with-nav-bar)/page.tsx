import { Button } from "@/components/ui/button"

const Home = () => {    
    return (
        <div className='w-full h-screen bg-background flex justify-center items-center p-8'>
            <div className='grid grid-cols-12 h-full w-full grid-rows-[1fr_70px]'>
                <div className="col-span-2 bg-red-200">
                    
                </div>
                <div className="col-span-10 bg-blue-200">
                    <div className="flex items-center justify-center h-[75%] bg-green-200">

                    </div>
                </div>
                <div className="col-span-2 bg-orange-200">
                    <div className="">
                        <Button>{'<M'}</Button>
                        <Button>{'<S'}</Button>
                        <Button>{'<D'}</Button>
                        <Button>{'D>'}</Button>
                        <Button>{'S>'}</Button>
                        <Button>{'M>'}</Button>
                    </div>
                </div>
                <div className="col-span-10 bg-orange-400"></div>
            </div>
        </div>
    )
}

export default Home
