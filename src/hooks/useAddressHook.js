import { useEffect, useState } from "react";
import {ADDRESS_VN} from "../utils/contants";

export const useAddressHook = ({ province, district, ward }) => {
    const [provinces, setProvinces] = useState(Object.keys(ADDRESS_VN).map(key => ({
        key: key,
        name: ADDRESS_VN[key].name
    })));
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        if (province) {
            try {
                const dataDistrict = ADDRESS_VN[province].district
                setDistricts(Object.keys(dataDistrict).map(key => ({
                    key: key,
                    name: dataDistrict[key].name
                })))
            } catch (e) {

            }
        }
    }, [province]);

    useEffect(() => {
        if (province && district) {
            try {
                const dataWard = ADDRESS_VN[province].district[district].wards

                setWards(Object.keys(dataWard).map(key => ({
                    key: key,
                    name: dataWard[key]
                })))
            } catch (e) {

            }
        }
    }, [district]);

    return { provinces, districts, wards };
};
