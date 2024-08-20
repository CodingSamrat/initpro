"use client"

import { setCounter } from "@/redux/slices/counter.slice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"




const Counter = () => {

    const dispatch = useDispatch()
    const [step, setStep] = useState(1)

    const { counter } = useSelector(state => state.counter)



    function increment() {
        let _c = counter + Number(step)
        if (_c < 100) {
            dispatch(setCounter({ counter: _c }))
        }

    }

    function decrement() {
        let _c = counter - Number(step)
        if (_c > -100) {
            dispatch(setCounter({ counter: _c }))
        }
    }
    return (
        <>
            <div className="mt-9 flex flex-col items-center justify-center gap-3">
                <p className="leading-4"><strong>steps</strong></p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setStep(1)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${step === 1 ? "bg-accent text-reversed-content" : "bg-fill-1"}`}
                    >1</button>

                    <button
                        onClick={() => setStep(2)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${step === 2 ? "bg-accent text-reversed-content" : "bg-fill-1"}`}
                    >2</button>

                    <button
                        onClick={() => setStep(3)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${step === 3 ? "bg-accent text-reversed-content" : "bg-fill-1"}`}
                    >3</button>
                </div>

            </div>

            <div className=" w-60 h-16  flex items-center justify-between gap-3">
                <button onClick={decrement} className="rounded-full w-8 h-8 text-2xl border col-span-1  flex items-center justify-center">-</button>
                <div className="text-xl font-bold border rounded-md w-28 h-10 flex items-center justify-center text-accent">{counter}</div>
                <button onClick={increment} className="rounded-full w-8 h-8 text-2xl border col-span-1  flex items-center justify-center">+</button>
            </div>
        </>
    )
}

export default Counter
