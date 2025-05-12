import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { ResultCard } from 'asab_webui_components';
import { Link, useParams, useRoutes } from 'react-router-dom';
import { DateTime } from 'asab_webui_components';

export function Detail(props) {
    const { t } = useTranslation();
    const [data, setData] = useState(null)
    let params = useParams();
    console.log(data)
    useEffect(() => {
        fetchDetail()
    }, [])

    async function fetchDetail() {
        const data = await fetch(`https://devtest.teskalabs.com/detail/${params.id}`).then((res) => { if (res.ok) return res.json() });
        setData(data);
    }

    return (
        <Container className='h-100 d-flex flex-column'>
            <h3 className='d-flex align-items-center justify-content-center gap-2'><i class="bi bi-person-circle mr-1"></i>{t('Training|Detail')}</h3>
            <Link to="/" className='d-flex align-items-center gap-1'><i class="bi bi-arrow-left"></i><span>{t('Training|Back to listing')}</span> </Link>
            {data && <ResultCard body={<Body data={data} />} />}

        </Container>
    );
}

const Body = ({ data }) => {
    const { t } = useTranslation();
    return (
        <div className="flex-fill">
            <ul className='list-group'>
                <li className='list-group-item'>
                    {t('Training|Username')}: {data.username}
                </li>
                <li className='list-group-item'>
                    ID: {data.id}
                </li>
                <li className='list-group-item'>
                    Email: <span><i class="bi bi-envelope"></i> {data.email}</span>
                </li>
                <li className='list-group-item'>
                    {t('Training|Phone')}: <span><i class="bi bi-phone"></i> {data.phone_number}</span>
                </li>
                <li className='list-group-item'>
                    {t('Training|Address')}: <span><i class="bi bi-geo-alt"></i> {data.address}</span>
                </li>
                <li className='list-group-item'>
                    {t('Training|IPAddress')}: {data.ip_address}
                </li>
                <li className='list-group-item'>
                    {t('Training|MACAddress')}: {data.mac_address}
                </li>
                <li className='list-group-item'>
                    {t('Training|Created at')}: {<DateTime value={data.created} />}
                </li>
                <li className='list-group-item'>
                    {t('Training|Last sign in')}: {<DateTime value={data.last_sign_in} />}
                </li>
            </ul>
        </div>

    );
}





