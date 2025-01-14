package hoodclassics.opp.service;

import java.util.Optional;

public interface GeocodingService {
    Optional<String> reverseGeocode(double latitude, double longitude);
    public Optional<String> extractLocationFromAddress(String address);
    public Optional<String> extractCountryFromAddress(String address);
}