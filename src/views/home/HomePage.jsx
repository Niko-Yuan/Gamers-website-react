import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { STATUS } from "../../utils/status";
import {
  Banner,
  ImageSlider,
  Preloader,
  Title,
  Tabs
} from "../../components/common/index";
import { join_image } from "../../utils/images";
import { GameList } from "../../components/game/index";
import {
  selectAllGames,
  selectAllGamesStatus,
} from "../../redux/store/gameSlice";
import { fetchAsyncGames } from "../../redux/utils/gameUtils";
import {
  selectAllGenres,
  selectAllGenresStatus,
} from "../../redux/store/genreSlice";
import { fetchAsyncGenres } from "../../redux/utils/genreUtils";

const HomePage = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const genres = useSelector(selectAllGenres);
  const genresStatus = useSelector(selectAllGenresStatus);

  useEffect(()=> {
    dispatch(fetchAsyncGames());
    dispatch(fetchAsyncGenres());
  },[]);

  const renderedPopularGames = <>
  <GameList sliceValue={9} games={games}/>
  <div className='d-flex justify-content-center'>
    <Link to="/games" className='section-btn'>see more games</Link>
    </div>
  </>;

  return (
    <HomeWrapper>
      <Banner />
      <section className='section sc-popular'>
        <div className='container'>
          <Title titleName={{ firstText: "top popular", secondText: "games" }}/>
          {
            gamesStatus === STATUS.LOADING ? <Preloader />: games ?.length >0 ?renderedPopularGames : "No games found!"
          }
        </div>
      </section>
      <ImageSlider />
      <section
        className="section sc-join d-flex align-items-center"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${join_image}) center/cover no-repeat`,
        }}
      >
        <div className="container w-100">
          <div className="join-content text-white mx-auto text-center">
            <h2 className="join-title mb-3">
              JOIN THE <span>COMMUNITY</span>
            </h2>
            <p className="lead-text">
              Join our Discord community which is in the making and made by
              gamers for gamers. All are welcome to join no matter the game you
              play, we&apos;re here to have a good.
            </p>
            <button type="button" className="section-btn mt-4">
              join discord
            </button>
          </div>
        </div>
      </section>
      <section className="section sc-genres">
        <div className="container">
          <Title
            titleName={{
              firstText: "top",
              secondText: "genres",
            }}
          />
        </div>
        {genresStatus === STATUS.LOADING ? (
          <Preloader />
        ) : genres?.length > 0 ? (
          <Tabs sliceValue={9} data={genres} />
        ) : (
          "No genres found!"
        )}
      </section>
    </HomeWrapper>
  )
}

export default HomePage;

const HomeWrapper = styled.div`
  .sc-popular{
    background-color: var(--clr-violet-dark-active);
    .section-btn{
      margin-top: 60px;
    }
  }

  .sc-join{
    min-height: 640px;

    .join-content{
      max-width: 600px;
    }

    .join-title{
      text-shadow: 0px 4px 4px 0px #00000040;
      font-size: 44px;
      letter-spacing: 0.09em;

      span{
        color: var(--clr-green-normal);
        font-family: var(--font-family-right);
      }
    }
  }

  .sc-genres{
    background-color: var(--clr-violet-dark-active);
  }

  .sc-stores{
    min-height: 841px;
  }
`;
