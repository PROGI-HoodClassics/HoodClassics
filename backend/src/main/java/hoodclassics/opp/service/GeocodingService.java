package hoodclassics.opp.service;

public interface GeocodingService {
    String reverseGeocode(double latitude, double longitude);
    public String extractLocationFromAddress(String address);
    public String extractCountryFromAddress(String address);
}