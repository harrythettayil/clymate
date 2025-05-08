import WeatherSkeleton from "@/components/loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useReverseGeocodeQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const Dashboard = () => {

    const {coordinates,error: locationError,getLocation,isLoading: locationLoading} = useGeolocation()

    const locationQuery = useReverseGeocodeQuery(coordinates)

    const handleRefresh = () => {
        getLocation()
        if(coordinates){
            //
        }
    }

    if(locationLoading){
        <WeatherSkeleton />
    }

    if(locationError){
        return <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                <p>{locationError}</p>
                <Button onClick={getLocation} variant={"outline"} className="w-fit">
                    <MapPin className="mr-2 h-4 w-4"/>
                    Enable Location
                </Button>
            </AlertDescription>
        </Alert>
    }

    if(!coordinates){
        return <Alert variant="destructive">
            <AlertTitle>Location Required</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                <p>Please enable location to see local weather</p>
                <Button onClick={getLocation} variant={"outline"} className="w-fit">
                    <MapPin className="mr-2 h-4 w-4"/>
                    Enable Location
                </Button>
            </AlertDescription>
        </Alert>
    }

    return (<div className="space-y-4">
        <div className="flex item-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">My Location</h1>
            <Button variant={"outline"} size={"icon"} onClick={handleRefresh}><RefreshCw className="h-4 w-4"/></Button>
        </div>
    </div>)
}

export default Dashboard;