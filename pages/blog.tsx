import React, {FunctionComponent, useEffect, useState,} from "react";

import Layout from "../components/Layout";

const Blog: FunctionComponent = () => {
    const [articles, setArticles] = useState({jsonData : []});
    const baseUrl = 'https://upply-interview.herokuapp.com/';

    const transformASC = (item) => {
        let current = item.sort((a,b) => {
            return a.date - b.date;
        })

        return current;
    };
    const transformDSC = (item) => {
        let current = item.sort((a,b) => {
            return a.date + b.date;
        })

        return current;
    };

    const trieASC = () => {
        let current = transformASC(articles.jsonData);
        setArticles({jsonData: current})
    }
    const trieDSC = () => {
        let current = transformDSC(articles.jsonData);
        setArticles({jsonData: current})
    }

    useEffect(() => {
        fetch(baseUrl)
        .then( (response) => {
            return response.json();
        })
        .then(jsonData => {
            let transformed = jsonData.map((item) => {
                if(item.date){
                    item.date = new Date(item.date);
                }else{
                    item.date = new Date("1970-06-01T12:00");
                }
                return item;
            })

            transformed = transformASC(transformed);

            setArticles({jsonData : transformed})
        })
    }, [])

    const articlesItems =
        <article>
            {articles.jsonData.map((item) => {
                const dateString = (item.date instanceof Date) ? item.date.toLocaleDateString(): "";
                return (
                    <section>
                        <h2 className="title"> {item.title}</h2>
                        <img src={ baseUrl+'/images/'+item.src} alt=""/>
                        <p className="text">
                            {item.text}
                        </p>

                        {item.date !== "undefined" &&
                        <aside><p className="date">
                            {dateString}
                        </p></aside>
                        }

                    </section>
                )
            })}
        </article>
    ;

    return (
        <Layout>
            <h1 data-testid="page-title">Blog</h1>
            <button onClick={trieASC}> trie ascendant</button>
            <button onClick={trieDSC}> trie descendant</button>
            {articlesItems}

        </Layout>
    )
}


export default Blog;