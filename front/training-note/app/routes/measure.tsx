import React, { useState } from "react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { create, get } from "../services/measure";

export async function loader({ request }: LoaderFunctionArgs) {
    const user =  await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    const weight = await get(user)
    return weight
}

export async function action({ request }: ActionFunctionArgs) {
    const user = await authenticator.isAuthenticated(request)
    const formData = await request.formData();
    const weight = Number(formData.get("weight"))
    if (user && weight) {
        return await create(weight, user)
    }
}

export default function Measure() {
    const loadWeight: number = useLoaderData();
    const [weight, setWeight] = useState(loadWeight);
    const [intWeight, setIntWeight] = useState(0);
    const [decWeight, setDecWeight] = useState(0);

    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    const weekDay = ["日", "月", "火", "水", "木", "金", "土"];

    // 体重の入力制限(数値のみ、小数点以下1桁まで)
    const weigthValidation = (e: React.FormEvent<HTMLInputElement>, type: string) => {
        // 数値以外の入力を無効化
        if(isNaN(Number(e.currentTarget.value))) {
            e.currentTarget.value = e.currentTarget.value.slice(0, 0)
        }
        if(type == "int"){
            if(e.currentTarget.value.length > 3) {
                e.currentTarget.value = e.currentTarget.value.slice(0, 3)
            }
            setIntWeight(Number(e.currentTarget.value))
        }
        if(type == "dec"){
            if(e.currentTarget.value.length > 1) {
                e.currentTarget.value = e.currentTarget.value.slice(0, 1)
            }
            setDecWeight(Number(e.currentTarget.value))
        }
    }

    const onSubmit = () => {
        if(intWeight !== 0 && decWeight !== 0) {
            setWeight(Number(intWeight + "." + decWeight))
        }
    }
    return (
        <div className="w-full h-body flex flex-col items-center justify-between p-5">
            <p className="w-full h-fit text-4xl text-center">{month}月 {date}日 ({weekDay[day]})</p>
            <div className="w-full h-full flex flex-col py-5 items-center justify-between">
            {loadWeight == -1
                ?
                <>
                    <p className="w-full h-1/6 text-4xl text-center">初めての計測ですね！</p>
                    <p className="w-full h-1/6 text-4xl text-center">体重を入力してください</p>
                    <p>{intWeight}.{decWeight}</p>
                    <div className="flex gap-3 items-center justify-center">
                        <input type="text" className="w-36 h-28 border text-5xl text-center" placeholder="50" onChange={(e) => weigthValidation(e, "int")} />
                        <p className="text-5xl">.</p>
                        <input type="text" className="w-28 h-28 border text-5xl text-center" placeholder="0"  onChange={(e) => weigthValidation(e, "dec")}/>
                        <p className="text-5xl">kg</p>
                    </div>
                </>
                :
                <>
                    <p className="w-full h-fit text-6xl text-center">{weight.toFixed(1)} kg</p>
                    <div className="w-full h-1/5 border border-black shadow-lg rounded-full mt-1">
                        <button className="w-1/4 h-full" onClick={() => setWeight(weight - 1)}>-1</button>
                        <button className="w-1/4 h-full" onClick={() => setWeight(weight - 0.1)}>-0.1</button>
                        <button className="w-1/4 h-full" onClick={() => setWeight(weight + 0.1)}>+0.1</button>
                        <button className="w-1/4 h-full" onClick={() => setWeight(weight + 1)}>+1</button>
                    </div>
                </>
            }
            </div>
            <Form method="post" className="w-full h-full flex items-center justify-center">
                <input type="hidden" name="weight" className="w-1/3 text-6xl text-center" value={weight.toFixed(1)} />
                <input type="submit" className="w-32 h-32 bg-gradient-to-b from-primary to-[#37cba1] rounded-full text-white text-2xl font-bold" value="決定" onClick={() => onSubmit()} />
            </Form>
        </div>
    );
}
