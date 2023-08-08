import axios from "axios";
import { useEffect, useState } from "react";

export const useAddressHook = ({ province, district, ward }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        axios.get("/api/addressvn/provinces").then((res) => {
            setProvinces(res.data);
        });
    }, []);

    useEffect(() => {
        let idProvince = null;
        if (province && JSON.parse(province)) {
            idProvince = JSON.parse(province).uid;
        }
        if (!idProvince) {
            setDistricts([]);
            return;
        }
        axios.get(`/api/addressvn/districts/${idProvince}`).then((res) => {
            setDistricts(res.data);
        });
    }, [province]);

    useEffect(() => {
        let idDistrict = null;
        if (province && JSON.parse(district)) {
            idDistrict = JSON.parse(district).uid;
        }
        if (!idDistrict) {
            setDistricts([]);
            return;
        }
        axios.get(`/api/addressvn/district/${idDistrict}`).then((res) => {
            // setDistricts(res.data);
            console.log("res.data", res.data);
            if (Array.isArray(res.data?.wards)) {
                setWards(res.data.wards);
            }
        });
    }, [district]);

    return { provinces, districts, wards };
};
