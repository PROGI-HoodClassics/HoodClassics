package hoodclassics.opp.service;

public interface GeocodingService {
    String reverseGeocode(double latitude, double longitude);
    String forwardGeocode(String address);
    public String extractTownFromAddress(String address);
}