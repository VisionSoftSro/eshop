import React from 'react';
import {Link} from "../../../common/component/Link";

export function Page404() {
    return (
        <section className="error_page text-center">
            <div className="container" style={{padding:20, minHeight:500}}>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                        <div className="not-found-text">
                            <h2>404</h2>
                            <h5 className="mb-3">Stránka nenalezena</h5>
                            <p>Omlouváme se, ale stránku kterou jste zadali neexistuje.</p>
                            <Link href="/" className="btn bigshop-btn mt-3"><i className="fa fa-home" aria-hidden="true"/> Domů</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}