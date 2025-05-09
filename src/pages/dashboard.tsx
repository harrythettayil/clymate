import { CurrentWeather } from "@/components/current-weather";
import { FavoriteCities } from "@/components/favorite-cities";
import { HourlyTemperature } from "@/components/hourly-temprature";
import WeatherSkeleton from "@/components/loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { WeatherDetails } from "@/components/weather-details";
import { WeatherForecast } from "@/components/weather-forecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates);


  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  };

  if (locationLoading || !weatherQuery.data || !forecastQuery.data) {
    <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location to see local weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if(weatherQuery.error || forecastQuery.error){
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data, please try again</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex item-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching}>
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`} />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {weatherQuery.isFetched && weatherQuery.data && <CurrentWeather data={weatherQuery.data} locationName={locationName} /> }
          {forecastQuery.isFetched && forecastQuery.data && <HourlyTemperature data={forecastQuery.data} />}
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {weatherQuery.isFetched && weatherQuery.data && <WeatherDetails data={weatherQuery.data}/> }
          {forecastQuery.isFetched && forecastQuery.data && <WeatherForecast data={forecastQuery.data} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
