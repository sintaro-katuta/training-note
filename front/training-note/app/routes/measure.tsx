import MeasureList from "../components/measure/measure";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
}

export default function Measure() {
    return (
        <>
            <MeasureList />
        </>
    );
}